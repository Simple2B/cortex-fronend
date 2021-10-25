import React, { ReactElement, useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import { clientApi } from "../../api/clientApi";
import NavBar from '../NavBar/NavBar';
import { instance } from "../../api/axiosInstance";
import { User } from "../../types/patientsTypes";
import { ReactComponent as SearchIcon } from '../../images/lupa.svg'
import './queue.css'
import { NavLink } from 'react-router-dom';

export default function Queue(): ReactElement {
  const [queue, setQueue] = useState<User[]>([]);
  const [clients, setClients] = useState<User[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [querySearch, setSearchQuery] = useState<string>('');

  const [isModalOpen, setModalOpen] = useState<number>(0);

  const getClientsForQueue = async () => {
    try {
      const response = await instance()
      .get('api/client/queue');
      console.log("clients in queue => ", response.data);
      setQueue(response.data);
    } catch (error: any) {
      console.log('GET: error message =>  ', new Error(error.message));
      throw new Error(error.message);
    }
  };

  const getClients = async () => {
    try {
      const response = await instance()
      .get('api/client/clients');
      console.log("clients => ", response.data);
      setClients(response.data);
    } catch (error: any) {
      // place to handle errors and rise custom errors
      console.log('GET: error message =>  ', error.message);
      console.log('error response data clients => ', error.response.data);
      throw new Error(error.message);
    };
  }

  useEffect(() => {
    getClients();
    getClientsForQueue();
  }, []);

  const addClient = (patient: User) => {
    setQueue((prev: User[]) => [...prev, patient]);
  };

  const removeMemberFromQueue = (index: number) => {
    const newClients = [...queue];
    console.log("newClients before deleted => ", newClients);
    newClients.splice(index, 1);
    console.log("newClients after deleted => ", newClients);
    setQueue(newClients);

    // setQueue((queue: User[]) => queue.filter((prevPatient, i) => i !== index));

    };

  return (
    <>
      <NavBar />
      <div className="rogue"><div className="rogue_mode">Rogue Mode</div>
        <div className="button b2" id="button-10">
          <input defaultChecked={true} type="checkbox" className="checkbox" />
          <div className="knobs">
            <span>On</span>
          </div>
          <div className="layer"></div>
        </div>
      </div>
      <div className="queue">
        <h1 className="queue_title">The Queue</h1>

        { queue.length > 0
          ?
          queue.map((patient, index) => (
            <div className="queue_list" key={index} >
                <i className="fas fa-times faTimesItemQueue" title="Delete from queue" onClick={(e) => setModalOpen(patient.id)}/>
                <div id="myModal" className={isModalOpen === patient.id ? "modalOpen" : "modal"}>
                  <div className="modal-content">
                    <span className="close" onClick={() => setModalOpen(0)}>&times;</span>
                    <div className="modalText">
                      Are you sure you want to remove {patient.first_name} {patient.last_name} from the queue ?
                    </div>
                    <div className="btnsModal">
                      <div className="btnModalOk" onClick={() => {

                          clientApi.deleteClient({
                            "id": patient.id,
                            "api_key": patient.api_key,
                            "first_name": patient.first_name,
                            "last_name": patient.last_name,
                            "phone": patient.phone,
                            "email": patient.email,
                            "rougue_mode": true,
                          });

                          removeMemberFromQueue(index);
                          setModalOpen(0);
                        }}>
                          Ok
                      </div>
                      <div onClick={() => setModalOpen(0)}>Cancel</div>
                    </div>
                  </div>
                </div>
                <NavLink to={`/${patient.api_key}/intake`} >
                  <div className="list"  onClick={() => {clientApi.clientIntake({"api_key": patient.api_key, "rougue_mode": true})}}>
                      {patient.last_name}, {patient.first_name}
                  </div>
                </NavLink>
            </div>
          ))
          :
          <div className="infoMessageIntake">NO PATIENTS IN QUEUE</div>
        }

        <button className="queue_add_button" onClick={() => {
          setIsOpen(true);
          setSearchQuery("");
          }}>+Add new</button>

        <Popup open={isOpen} modal>
          <div className="modal_window">
            <div className="lists">
                <i className="fas fa-times" onClick={() => setIsOpen(false)}/>
                <div className="input_search">
                  <SearchIcon className="search_icon" />
                  <input value={querySearch} onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }} className="patients_search" placeholder="Search" />
                </div>
                <div className="client_lists">
                    { clients.filter(client => !(queue.map(q => q.phone)).includes(client.phone)).filter(client => {
                      if (querySearch === '') {
                          return client;
                      } else if ((client.first_name + client.last_name).toLowerCase().includes(querySearch.toLowerCase())) {
                        return client;
                      }
                      }).map((patient, index )=> (
                        <div className="queue_list" key={index} onClick={() => {
                              clientApi.addClientToQueue(patient);
                              addClient(patient);
                              setSearchQuery("");
                              setIsOpen(false);
                            }}>
                          {patient.last_name}, {patient.first_name}
                        </div>
                      ))
                    }
                </div>
            </div>
          </div>
        </Popup>

      </div>
    </>
  )
}

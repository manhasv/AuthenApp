import { useEffect, useState } from "react";
import PeopleTable from "./Users/PeopleTable";
import { useParams } from "react-router-dom";
import * as client from "../Account/client";
import { FaPlus } from "react-icons/fa";
import TopBar from "../Components/TopBar";
import AppointmentDetails from "./Users/AppointmentDetails";

export default function ManageUser() {
    const [users, setUsers] = useState<any[]>([]);
    const { uid } = useParams();
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const fetchUsers = async () => {
        const data = await client.fetchAllUsers();
        setUsers(data.list);
    };
    useEffect(() => {
        fetchUsers();
        
    }, []);
    return (
        <div>
            <TopBar />
            <h3>Users</h3>
            <PeopleTable users={users} />
        </div>
     );}
     
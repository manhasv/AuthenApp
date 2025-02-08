import { useEffect, useState } from "react";
import PeopleTable from "./Users/PeopleTable";
import * as client from "../Account/client";
import TopBar from "../Components/TopBar";

export default function ManageUser() {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        const data = await client.fetchAllUsers();
        setUsers(data.list);
    };

    const handleDelete = async (id: string) => {
        try {
            await client.deleteUserWithID(id);
            setUsers((prev) => prev.filter((user) => user.id !== id)); // Update state
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleSave = async (id:string, user: any) => {
        try {
            await client.updateUserWithID(id, user);
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div>
            <TopBar />
            <h3>Users</h3>
            <PeopleTable users={users} onDelete={handleDelete} onSave={handleSave} />
        </div>
     );}
     
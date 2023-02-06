import React, { useEffect, useState } from 'react';

export default function ManageContact() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch('/api/contacts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);
    const handleRemove = ({ email, name }) => {
        fetch(`/api/contacts?email=${email}&name=${name}`, {
            method: 'DELETE',
        }).then(() => {
            setData(
                data.filter(
                    (item) => item.email !== email && item.name !== name
                )
            );
        });
    };

    return (
        <div class="relative overflow-x-auto p-10">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 w-1/6">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3 w-1/6">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3 w-1/6">
                            Phone
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Message
                        </th>
                        <th scope="col" class="px-6 py-3 w-14">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td rowSpan={5}>Loading...</td>
                        </tr>
                    ) : (
                        data.map(
                            ({ email, name, phone, message, messageTitle }) => (
                                <tr
                                    key={email}
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {name}
                                    </th>
                                    <td class="px-6 py-4">{email}</td>
                                    <td class="px-6 py-4">{phone}</td>
                                    <td class="px-6 py-4">
                                        <h3>{messageTitle}</h3>
                                        <p>{message}</p>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleRemove({ email, name })
                                            }
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

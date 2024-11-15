import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee');
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching employees');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Employee List</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Shift</th>
              <th className="py-2 px-4 text-left">Length of Employment</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.Employee_ID} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{employee.Employee_ID}</td>
                <td className="py-2 px-4">{`${employee.First_Name} ${employee.Last_Name}`}</td>
                <td className="py-2 px-4">{employee.Phone_Number}</td>
                <td className="py-2 px-4">{new Date(employee.Shift).toLocaleString()}</td>
                <td className="py-2 px-4">{employee.Length_of_Employment} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
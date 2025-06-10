'use client';
import React from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ICardData, ISuggestData } from '@/features/dashboard/Teller/components/types';

interface AdminTableProps {
  data: ICardData[] | ISuggestData[];
  table: 'times' | 'majors' | 'technologies' | 'impacts' | 'outlines';
  onEdit: (item: ICardData | ISuggestData) => void;
  onDelete: (id: string) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ data, table, onEdit, onDelete }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No data to display.</p>;
  }

  const getTableHeader = () => {
    switch (table) {
      case 'times':
        return 'Time';
      case 'majors':
        return 'Major';
      case 'technologies':
        return 'Technology';
      case 'impacts':
        return 'Impact';
      default:
        return '';
    }
  };

  const getImageSrc = (image: string | File): string => {
    if (typeof image === 'string' && image.startsWith('http')) {
      return image; // Use Cloudinary URL directly
    } else if (image instanceof File) {
      return URL.createObjectURL(image); // Preview for new uploads
    }
    return 'https://via.placeholder.com/50'; // Fallback to external placeholder
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <div className="min-w-full inline-block align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider">
                ID
              </th>
              {table === 'outlines' ? (
                <>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider"
                  >
                    Step
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider"
                  >
                    Title
                  </th>
                </>
              ) : (
                <>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider"
                  >
                    {getTableHeader()}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider"
                  >
                    Image
                  </th>
                </>
              )}
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-black uppercase tracking-wider">
                Operation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item._id || index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                {table === 'outlines' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ISuggestData).step}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ISuggestData).time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(item as ISuggestData).title}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ICardData).title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(item as ICardData).image ? (
                        <Image
                          src={getImageSrc((item as ICardData).image)}
                          alt={(item as ICardData).title}
                          width={50}
                          height={50}
                          className="object-cover rounded"
                          onError={(e) => {
                            console.error('Image failed to load:', (item as ICardData).image);
                            e.currentTarget.src = 'https://via.placeholder.com/50';
                          }}
                        />
                      ) : (
                        <Image
                          src="https://via.placeholder.com/50"
                          alt="Default"
                          width={50}
                          height={50}
                          className="object-cover rounded"
                        />
                      )}
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-400 cursor-pointer hover:text-blue-400 mr-3 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm bg-blue-100 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaEdit className="mr-1" />
                  </button>
                  <button
                    onClick={() => onDelete(item._id!)}
                    className="text-red-400 cursor-pointer hover:text-red-400 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm bg-red-100 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrash className="mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;

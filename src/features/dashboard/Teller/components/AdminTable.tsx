import React from 'react'; 
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
    return <p className="text-center text-gray-500 mt-4">Không có dữ liệu để hiển thị.</p>;
  }

  const getTableHeader = () => {
    switch (table) {
      case 'times':
        return 'Thời điểm';
      case 'majors':
        return 'Ngành';
      case 'technologies':
        return 'Công nghệ';
      case 'impacts':
        return 'Tác động';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <div className="min-w-full inline-block align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              {table === 'outlines' ? (
                <>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bước
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emoji
                  </th>
                </>
              ) : (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getTableHeader()}
                </th>
              )}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item._id || item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                {table === 'outlines' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ISuggestData).step}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ISuggestData).time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ISuggestData).title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(item as ISuggestData).emoji ? (
                        <span className="text-xl">{(item as ISuggestData).emoji}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                  </>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item as ICardData).title}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 cursor-pointer hover:text-blue-900 mr-3 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaEdit className="mr-1" /> Sửa
                  </button>
                  <button
                    onClick={() => onDelete(item._id || item.id!)}
                    className="text-red-400 cursor-pointer hover:text-yellow-400 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaTrash className="mr-1" /> Xóa
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
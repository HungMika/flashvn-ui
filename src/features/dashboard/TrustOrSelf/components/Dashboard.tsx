import { QuestionWithCounts } from '@/features/dashboard/TrustOrSelf/components/types';
import { FaTrash, FaRegEdit, FaPlus } from 'react-icons/fa';

interface DashboardLayoutProps {
  questions: QuestionWithCounts[];
  loading: boolean;
  setEditQuestion: (question: QuestionWithCounts | null) => void;
  setShowEditQuestionPopup: (show: boolean) => void;
  setShowDeleteQuestionPopup: (id: string | null) => void;
  setShowAddQuestionPopup: (show: boolean) => void;
  handleLogout: () => void;
}

export default function DashboardLayout({
  questions,
  loading,
  setEditQuestion,
  setShowEditQuestionPopup,
  setShowDeleteQuestionPopup,
  setShowAddQuestionPopup,
}: DashboardLayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="tableContainer bg-[#F3F4F6] rounded-lg p-2 sm:p-4 mb-4">
        <div className="tableHeader flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">List of situations</h2>
          <button
            onClick={() => setShowAddQuestionPopup(true)}
            className="addButton bg-[#3F99E9] text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-[#1B1B62] flex items-center gap-2 transition-colors text-sm sm:text-base cursor-pointer"
          >
            <FaPlus /> Add
          </button>
        </div>
        <div className="tableWrapper overflow-x-auto">
          <table className="table w-full border-collapse bg-[#F3F4F6]">
            <thead>
              <tr className="bg-[#1B1B62] text-white">
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base w-20">ID</th>
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base w-32">Title</th>
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base max-w-xs break-words">Content</th>
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base w-20">Trust</th>
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base w-20">Self</th>
                <th className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base w-[150px]">Operation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="border border-gray-200 p-1 sm:p-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                    Loading...
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="border border-gray-200 p-1 sm:p-2 text-center text-gray-600 text-xs sm:text-sm md:text-base">
                    Don't have any data.
                  </td>
                </tr>
              ) : (
                questions.map((q, index) => (
                  <tr key={q._id} className="border border-gray-200 hover:bg-gray-100 transition-colors">
                    <td className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base text-center">{index + 1}</td>
                    <td className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base break-words">{q.title || '-'}</td>
                    <td className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base break-words">{q.content}</td>
                    <td className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base text-center">{q.trustCount}</td>
                    <td className="border border-gray-200 p-1 sm:p-2 text-xs sm:text-sm md:text-base text-center">{q.selfCount}</td>
                    <td className="actionCell border border-gray-200 p-1 sm:p-2 w-[120px]">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => {
                            setEditQuestion(q);
                            setShowEditQuestionPopup(true);
                          }}
                          className="editButton bg-[#F5C035] text-white px-2 py-1 rounded hover:bg-[#1B1B62] transition-colors text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                        >
                          <FaRegEdit size={20} />
                        </button>
                        <button
                          onClick={() => setShowDeleteQuestionPopup(q._id)}
                          className="deleteButton bg-[#EF6921] text-white px-2 py-1 rounded hover:bg-[#1B1B62] transition-colors text-xs sm:text-sm flex items-center gap-1 cursor-pointer"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-auto py-4 text-center text-gray-500 text-xs sm:text-sm">
        Copyright belongs to FLASH VN & licensed by the community group.
      </footer>
    </div>
  );
}
'use client'; 
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import AdminTable from '@/features/dashboard/Teller/components/AdminTable';
import AddEditCardForm from '@/features/dashboard/Teller/components/AddEditCardForm';
import AddEditSuggestForm from '@/features/dashboard/Teller/components/AddEditSuggestForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { ftCardApi, ftSuggestApi } from '@/features/dashboard/Teller/api/ftApi'; 
import { ICardData, ISuggestData } from '@/features/dashboard/Teller/components/types'; 

type TableType = 'times' | 'majors' | 'technologies' | 'impacts' | 'outlines';

export default function TellerAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TableType>('times');
  const [data, setData] = useState<ICardData[] | ISuggestData[]>([]);
  const [isAddEditPopupOpen, setIsAddEditPopupOpen] = useState(false);
  const [editData, setEditData] = useState<ICardData | ISuggestData | null>(null);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [isChangeUsernamePopupOpen, setIsChangeUsernamePopupOpen] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [passwordChangeFormData, setPasswordChangeFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [usernameEmailChangeFormData, setUsernameEmailChangeFormData] = useState({
    newUsername: '',
    newEmail: '',
    currentPassword: '',
  });

  const fetchData = useCallback(async () => {
    try {
      if (activeTab === 'outlines') {
        const result = await ftSuggestApi.getAll();
        setData(result);
      } else {
        const result = await ftCardApi.getAllByGroup(activeTab);
        setData(result);
      }
    } catch (error: any) {
      console.error(`Error fetching ${activeTab} data:`, error);
      toast.error(`Lỗi khi tải dữ liệu ${activeTab}: ${error.message || error.toString()}`);
      setData([]); 
    }
  }, [activeTab]);

  const handleAddClick = () => {
    setEditData(null); 
    setIsAddEditPopupOpen(true);
  };

  const handleEditClick = (item: ICardData | ISuggestData) => {
    setEditData(item);
    setIsAddEditPopupOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      return;
    }
    try {
      if (activeTab === 'outlines') {
        await ftSuggestApi.delete(id);
      } else {
        await ftCardApi.delete(id);
      }
      toast.success('Xóa thành công!');
      fetchData(); 
    } catch (error: any) {
      console.error(`Error deleting ${activeTab} item:`, error);
      toast.error(`Lỗi khi xóa: ${error.message || error.toString()}`);
    }
  };

  const handleSave = async (newData: ICardData | ISuggestData) => {
    try {
      if (activeTab === 'outlines') {
        const suggestData = newData as ISuggestData;
        if (editData && editData._id) {
          await ftSuggestApi.update(editData._id, suggestData);
          toast.success('Cập nhật thành công!');
        } else {
          await ftSuggestApi.create(suggestData);
          toast.success('Thêm thành công!');
        }
      } else {
        const cardData = newData as ICardData;
        const formData = new FormData();
        formData.append('title', cardData.title);
        formData.append('group', cardData.group);
        if (cardData.image instanceof File) {
          formData.append('image', cardData.image);
        } else if (typeof cardData.image === 'string') {
          formData.append('image', cardData.image);
        }

        if (editData && editData._id) {
          await ftCardApi.update(editData._id, formData);
          toast.success(`Cập nhật ${activeTab} thành công!`);
        } else {
          await ftCardApi.create(formData);
          toast.success(`Thêm ${activeTab} thành công!`);
        }
      }
      setIsAddEditPopupOpen(false);
      fetchData();
    } catch (error: any) {
      console.error(`Error saving ${activeTab} item:`, error);
      toast.error(`Lỗi khi lưu: ${error.message || error.toString()}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    router.push('/'); 
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsProfilePopupOpen(true)}
            className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-400 flex items-center gap-2 text-lg transition-colors duration-200"
          >
            <FaUser /> Hồ sơ
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-400 flex items-center gap-2 text-lg transition-colors duration-200"
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['times', 'majors', 'technologies', 'impacts', 'outlines'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TableType)}
            className={`px-4 py-2 rounded-md cursor-pointer font-semibold transition-colors duration-200
              ${activeTab === tab
                ? 'bg-blue-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            {tab === 'times' && 'Thời điểm'}
            {tab === 'majors' && 'Ngành'}
            {tab === 'technologies' && 'Công nghệ'}
            {tab === 'impacts' && 'Tác động'}
            {tab === 'outlines' && 'Quy trình thảo luận'}
          </button>
        ))}
        <button
          onClick={handleAddClick}
          className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-yellow-400 flex items-center gap-2 text-lg transition-colors duration-200"
        >
          <FaPlus /> Thêm mới
        </button>
      </div>

      <AdminTable data={data} table={activeTab} onEdit={handleEditClick} onDelete={handleDeleteClick} />

      {activeTab !== 'outlines' ? (
        <AddEditCardForm
          isOpen={isAddEditPopupOpen}
          onClose={() => setIsAddEditPopupOpen(false)}
          onSave={handleSave}
          initialData={editData as ICardData | null}
          table={activeTab as Exclude<TableType, 'outlines'>}
        />
      ) : (
        <AddEditSuggestForm
          isOpen={isAddEditPopupOpen}
          onClose={() => setIsAddEditPopupOpen(false)}
          onSave={handleSave}
          initialData={editData as ISuggestData | null}
        />
      )}

      {/* Profile Popup */}
      {isProfilePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin hồ sơ</h2>
            <p>Username: {userData?.username || 'N/A'}</p>
            <p>Email: {userData?.email || 'N/A'}</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setIsChangePasswordPopupOpen(true);
                  setIsProfilePopupOpen(false);
                }}
                className="px-4 py-2 cursor-pointer bg-blue-400 text-white rounded-md hover:bg-yellow-400"
              >
                Đổi mật khẩu
              </button>
              <button
                onClick={() => {
                  setIsChangeUsernamePopupOpen(true);
                  setIsProfilePopupOpen(false);
                }}
                className="px-4 py-2 cursor-pointer bg-blue-400 text-white rounded-md hover:bg-yellow-400"
              >
                Đổi tên đăng nhập/Email
              </button>           
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsProfilePopupOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isChangePasswordPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
            <div className="flex flex-col space-y-4">
              <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordChangeFormData.currentPassword}
                onChange={(e) =>
                  setPasswordChangeFormData((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <label htmlFor="newPassword">Mật khẩu mới:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordChangeFormData.newPassword}
                onChange={(e) =>
                  setPasswordChangeFormData((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập mật khẩu mới"
              />
              <label htmlFor="confirmNewPassword">Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordChangeFormData.confirmNewPassword}
                onChange={(e) =>
                  setPasswordChangeFormData((prev) => ({ ...prev, confirmNewPassword: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                // onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-400 cursor-pointer text-white rounded-md hover:bg-yellow-400"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setIsChangePasswordPopupOpen(false)}
                className="px-4 py-2 bg-orange-400 cursor-pointer text-white rounded-md hover:bg-yellow-400"
              >
                Hủy
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsChangePasswordPopupOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isChangeUsernamePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000]">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md overflow-hidden p-6">
            <h2 className="text-xl font-bold mb-4">Đổi tên đăng nhập và Email</h2>
            <div className="flex flex-col space-y-4">
              <label htmlFor="newUsername">Tên đăng nhập mới:</label>
              <input
                type="text"
                id="newUsername"
                name="newUsername"
                value={usernameEmailChangeFormData.newUsername}
                onChange={(e) =>
                  setUsernameEmailChangeFormData((prev) => ({ ...prev, newUsername: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập tên đăng nhập mới"
              />
              <label htmlFor="newEmail">Email:</label>
              <input
                type="email"
                id="newEmail"
                name="newEmail"
                value={usernameEmailChangeFormData.newEmail}
                onChange={(e) =>
                  setUsernameEmailChangeFormData((prev) => ({ ...prev, newEmail: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập email mới"
              />
              <label htmlFor="currentPasswordForUsernameChange">Mật khẩu hiện tại:</label>
              <input
                type="password"
                id="currentPasswordForUsernameChange"
                name="currentPassword"
                value={usernameEmailChangeFormData.currentPassword}
                onChange={(e) =>
                  setUsernameEmailChangeFormData((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Nhập mật khẩu hiện tại"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                // onClick={handleChangeUsernameAndEmail}
                className="px-4 py-2 cursor-pointer bg-blue-400 text-white rounded-md hover:bg-yellow-400"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setIsChangeUsernamePopupOpen(false)}
                className="px-4 py-2 cursor-pointer bg-orange-400 text-white rounded-md hover:bg-yellow-400"
              >
                Hủy
              </button>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsChangeUsernamePopupOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
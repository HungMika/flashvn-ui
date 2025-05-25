'use client';

import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import QuestionSetList from '@/features/dashboard/Race/components/QuestionSetList';
import AddQuestionSetPage from '@/features/dashboard/Race/components/AddQuestionSetPage';
import GameHistoryList from '@/features/dashboard/Race/components/GameHistoryList';
import EditQuestionSetPage from '@/features/dashboard/Race/components/EditQuestionSetPage';
import { useState } from 'react';
import Link from 'next/link';
import { ModalProvider } from '@/lib/ModalContext';

export default function DashboardPage() {
  const [tab, setTab] = useState('historyQues');
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <Navbar fluid rounded className="border-blue-800 border-b-2">
        <NavbarBrand as={Link} href="/gameplay/mil-race">
          <img src="/milrace/img/logo/milrace.png" className="mr-3 h-7 sm:h-10" alt="MilRace Logo" />
          <span className=" text-[#1b1b62] self-center whitespace-nowrap text-xl font-semibold">MilRace</span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink
            active={tab === 'historyQues'}
            onClick={() => setTab('historyQues')}
            className="hover:cursor-pointer"
          >
            Lịch sử trò chơi
          </NavbarLink>
          <NavbarLink active={tab === 'list'} onClick={() => setTab('list')} className="hover:cursor-pointer">
            Danh sách bộ câu hỏi
          </NavbarLink>
          <NavbarLink active={tab === 'add'} onClick={() => setTab('add')} className="hover:cursor-pointer">
            Tạo bộ câu hỏi
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      {/* Main content */}
      <div className="p-2 w-full h-full">
        <ModalProvider>
          {tab === 'list' && (
            <QuestionSetList
              onEdit={(id) => {
                setEditingId(id);
                setTab('edit');
              }}
            />
          )}
          {tab === 'add' && (
            <AddQuestionSetPage
              onBack={() => {
                setTab('list');
              }}
            />
          )}
          {tab === 'historyQues' && <GameHistoryList />}
          {tab === 'edit' && editingId && (
            <EditQuestionSetPage
              id={editingId}
              onBack={() => {
                setEditingId(null);
                setTab('list');
              }}
            />
          )}
        </ModalProvider>
      </div>
    </div>
  );
}

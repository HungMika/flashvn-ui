'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa6';

import { ArrowLeft, CircleAlert, Loader2 } from 'lucide-react';
import { QuestionShowcase } from '@/features/dashboard/Bingo/components/QuestionShowcase';
import { useQuery } from '@tanstack/react-query';
import { getQuestionsByModule } from '@/features/dashboard/Bingo/api/question';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BingoEntryPage() {
  const params = useParams();
  const moduleId = params?.moduleId?.toString();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isError: errorQuestions,
  } = useQuery({
    queryKey: ['questions', moduleId],
    queryFn: () => getQuestionsByModule(moduleId!),
    enabled: !!moduleId,
  });

  const handleSubmit = () => {
    const value = inputRef.current?.value.trim();
    const number = parseInt(value || '', 10);

    if (isNaN(number) || number < 1 || number > 60) {
      setError('Chỉ chấp nhận phiếu từ 1 đến 60.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      router.push(`/gameplay/mil-bingo/module/${moduleId}/${number}`);
    }, 300);
  };

  const handleConfirmCode = () => {
    if (accessCode.trim() === 'flashvn-edu') {
      setShowCodeDialog(false);
      setShowShowcase(true);
    } else {
      setCodeError('Mã không đúng.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcefd4] px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm flex flex-col items-center gap-4 border-2 border-[#1b1b62]">
        <div className="absolute top-4 left-4">
          <ArrowLeft
            className="w-10 h-10 border rounded-md p-2 bg-rose-500 text-white cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => router.back()}
          />
        </div>

        {/* Logo */}
        <img src="/FLASH-logo-colorful.png" alt="logo" className="h-20 mb-4" />

        {loading ? (
          <Loader2 className="animate-spin text-[#1b1b62] w-6 h-6 my-6" />
        ) : (
          <>
            {error ? (
              <div className="w-full text-red-600 font-bold text-sm flex items-center gap-2 px-3">
                <CircleAlert className="w-4 h-4" />
                {error}
              </div>
            ) : (
              <div className="text-sm text-gray-500 font-medium">Nhập số phiếu từ 1 đến 60</div>
            )}

            {/* Form input */}
            <div className="w-full flex gap-2 items-center justify-center">
              <input
                ref={inputRef}
                type="number"
                min="1"
                placeholder="1 đến 60"
                className="w-28 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-lg"
                onFocus={() => setError('')}
              />
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold"
              >
                OK
              </button>
            </div>

            {/* Button Trình chiếu với Icon */}
            {!loading && questionsData?.questions?.length > 0 && (
              <button
                onClick={() => {
                  setAccessCode('');
                  setCodeError('');
                  setShowCodeDialog(true);
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition-all duration-200 shadow-md hover:scale-105 flex items-center justify-center gap-2"
                title="Trình chiếu"
              >
                <FaPlay className="w-5 h-5" /> <span className="font-semibold">Trình chiếu</span>
              </button>
            )}

            {/* Show Questions if allowed */}
            {showShowcase && questionsData?.questions && (
              <QuestionShowcase questions={questionsData.questions} onClose={() => setShowShowcase(false)} />
            )}
          </>
        )}
      </div>

      {/* Dialog nhập mã trình chiếu */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-[#1b1b62]">Xác thực trình chiếu</DialogTitle>
            <DialogDescription>Nhập mã truy cập để bắt đầu trình chiếu.</DialogDescription>
          </DialogHeader>
          <Input
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value);
              setCodeError('');
            }}
            placeholder="Mã truy cập..."
          />
          {codeError && <div className="text-red-600 text-sm mt-1 font-medium">{codeError}</div>}
          <DialogFooter className="mt-3">
            <Button variant="secondary" onClick={() => setShowCodeDialog(false)}>
              Huỷ
            </Button>
            <Button onClick={handleConfirmCode}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

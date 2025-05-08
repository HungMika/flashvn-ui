//src\services\auth.ts
import axios from 'axios';
export async function findAll() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    withCredentials: true,
  });

  return res.data;
}

export async function resetPassword(userId: string, newPassword: string) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
    { newPassword },
    {
      withCredentials: true,
    },
  );

  return res.data;
}

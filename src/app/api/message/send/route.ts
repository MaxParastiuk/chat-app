import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const [userId1, userId2] = chatId.split('--');

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response('Unathorized', { status: 401 });
    }
    const friendId = session.user.id === userId1 ? userId2 : userId1;

    const FriendList = (await fetchRedis(
      'smembers',
      `user:${session.user.id}:friends`,
    )) as string[];

    const isFriend = FriendList.includes(friendId);

    if (!isFriend) {
      return new Response('Unauthorized', { status: 401 });
    }

    const rawSender = (await fetchRedis(
      'get',
      `user:${session.user.id}`,
    )) as string;
    const sender = JSON.parse(rawSender) as User;
  } catch (error) {}
}

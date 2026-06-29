import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HighlightCardProps {
  id: number;
  imgUrl: string;
  title: string;
  channel: string;
  match: {
    id: number;
    homeTeam: { id: number; name: string; logo: string };
    awayTeam: { id: number; name: string; logo: string };
    league: { id: number; name: string };
  };
}

export const HighlightCard: FC<HighlightCardProps> = ({ id, imgUrl, title, channel, match }) => {
  const imageSrc = imgUrl && imgUrl.trim() !== '' ? imgUrl : null;

  return (
    <Link href={`/highlights?highlight=${id}`} className="group block">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="relative aspect-video">
          {imageSrc && (
            <Image src={imageSrc} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="eager" fetchPriority="high" className="object-cover group-hover:scale-105 transition-transform" />
          )}
          {!imageSrc && (
            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
              <svg className="w-12 h-12 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-zinc-500 mt-1">{channel}</p>
        </div>
      </div>
    </Link>
  );
};
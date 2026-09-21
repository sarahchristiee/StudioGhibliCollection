import Link from "next/link";

interface MovieCardProps {
    id: string | number;
    imageUrl: string;
    title: string;
    tags: string;
}

export default function MovieCard({ id, imageUrl, title, tags }: MovieCardProps) {
    return (
        <Link href={`/Filme/${id}`} className="w-full max-w-sm">
            <div className="relative group overflow-hidden cursor-pointer w-full max-w-xs" >

                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    src={imageUrl}
                    alt={title}
                />

                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0" />

                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col transform transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                    <p className="font-bold text-white text-lg leading-tight">{title}</p>
                    <p className="text-white text-sm leading-tight">{tags}</p>
                </div>

            </div>
        </Link>
    )
}

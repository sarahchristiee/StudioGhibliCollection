

import moviesData from '@/../public/Files/Collection.json';
import HeroSectionMovie from '../../components/HeroSectionMovie/HeroSectionMovie';
import Slider from '../../components/Slider/Slider';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

// filme por id selecionado
export async function generateStaticParams() {
    return moviesData.filmes.map((filme) => ({
        id: filme.id.toString(),
    }));
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function FilmeDetalhePage({ params }: PageProps) {
    const { id } = await params;

    // puxando dados
    const filme = moviesData.filmes.find((f) => f.id.toString() === id);

    //fallback
    if (!filme) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center text-white bg-neutral-950">
                <h1 className="text-2xl font-bold">Filme não encontrado</h1>
            </main>
        );
    }

    return (
        <>
            <Header />

            <main className="min-h-[250vh] w-full m-0">
                <HeroSectionMovie backgroundImage={filme.card} title={filme.titulo} />

                {/* infos principais */}
                <section className='flex max-w-6xl mx-auto gap-10 mt-10 justify-center items-center'>
                    <img src={filme.poster} alt={filme.titulo} className='w-50' />
                    <div>
                        <p className='text-3xl font-bold' >{filme.titulo}</p>
                        <div className='flex items-center gap-1' >
                            <p className='text-[#026E00] font-medium pr-4'>{filme.tags}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#F6C700"
                                className="w-5 h-5 inline-block"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <p className='font-medium'>{filme.nota}</p>
                        </div>
                        <p className='pt-6 font-bold text-xl' >Sinopse</p>
                        <p className='max-w-xl' >{filme.sinopse}</p>
                    </div>

                </section>

                {/* trailer */}
                <section className='w-full max-w-5xl mx-auto mt-10 px-4 sm:px-8 pt-10'>
                    <div className='flex items-center gap-4 w-full pb-5'>
                        <p className='whitespace-nowrap font-bold text-3xl font-franklin'>Trailer</p>
                        <hr className='flex-1 border-t-2 border-[#026E00]' />
                    </div>

                    <div className="relative w-full aspect-video overflow-hidden">
                        <iframe
                            className="w-full h-full absolute inset-0"
                            src={filme.trailer}
                            title="Video Player Youtube"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* ficha técnica */}
                <section className='w-full max-w-5xl mx-auto mt-10 px-4 sm:px-8 pt-10'>
                    <div className='flex items-center gap-4 w-full pb-5'>
                        <p className='whitespace-nowrap font-bold text-3xl font-franklin'>Ficha Técnica</p>
                        <hr className='flex-1 border-t-2 border-[#026E00]' />
                    </div>

                    <div className="w-full">
                        <table className="w-full text-left border-collapse">
                            <tbody>
                                <tr>
                                    <th className="py-3 px-4 font-bold text-[#026E00]">Direção</th>
                                    <td className="py-3 text-neutral-600">{filme.ficha.diretor}</td>
                                </tr>
                                <tr>
                                    <th className="py-3 px-4 font-bold text-[#026E00]">Roteiristas</th>
                                    <td className="py-3 text-neutral-600">{filme.ficha.roteiristas}</td>
                                </tr>
                                <tr>
                                    <th className="py-3 px-4 font-bold text-[#026E00]">Estrelas</th>
                                    <td className="py-3 text-neutral-600">{filme.ficha.estrelas}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </section>

                {/* carrosel gelaria */}
                <section className='w-full max-w-5xl mx-auto mt-10 px-4 sm:px-8 pt-10'>
                    <div className='flex items-center gap-4 w-full pb-5'>
                        <p className='whitespace-nowrap font-bold text-3xl font-franklin'>Galeria</p>
                        <hr className='flex-1 border-t-2 border-[#026E00]' />
                    </div>

                    <Slider images={filme.galeria} />


                </section>

            </main>
            <Footer />
        </>
    );
}
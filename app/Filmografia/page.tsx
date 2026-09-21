'use client';

import Collection from '../../public/Files/Collection.json'

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/HeroSection/HeroSection';
import MovieCard from '../components/MovieCard/MovieCard';

export default function page() {
  return (
    <>
      <Header />
      <main className="min-h-[250vh] w-full m-0">
        <HeroSection backgroundImage="/img/fundoFilmografia.jpg" title='Filmografia' />

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto justify-items-center">
        {Collection.filmes.map((movie) => (
          <MovieCard 
            key={movie.id}
            id={movie.id}
            imageUrl={movie.card}
            title={movie.titulo}
            tags={movie.tagCard}
          />
        ))}
      </section>

      </main>
      <Footer />
    </>
  )
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOW_IT_WORKS_STEPS } from '../constants';

const FAQ_DATA = [
    {
        question: "Co jsou to fotomagnetky a z čeho jsou vyrobeny?",
        answer: "Naše fotomagnetky vyrábíme ručně z prvotřídního prémiového fotopapíru spojeného s flexibilní magnetickou fólií o tloušťce 0.8 mm. Jsou stálobarevné, pružné a perfektně drží na chladničkách, magnetických tabulích či jakémkoliv jiném kovovém povrchu."
    },
    {
        question: "Jak probíhá výroba magnetek z vlastních fotek z mobilu?",
        answer: "Celý proces zabere sotva minutu! V našem konfigurátoru si zvolíte požadovaný rozměr, nahrajete fotky přímo z telefonu či počítače, případně oříznete zobrazení, a vložíte do košíku. Každou fotografii před tiskem ručně kontrolujeme a upravujeme pro optimální výsledek."
    },
    {
        question: "Jaké rozměry fotomagnetek na lednici nabízíte?",
        answer: "Aktuálně nabízíme širokou škálu oblíbených rozměrů: od menších čtvercových 5x5 cm a 7x7 cm přes univerzální 10x10 cm nebo obdélník 5x10 cm a 9x13 cm až po velké formáty jako A6, A5 a A4."
    },
    {
        question: "Mohu si objednat svatební oznámení nebo oznámení těhotenství?",
        answer: "Ano, magnetická oznámení jsou obrovským hitem! Máme speciální šablony pro magnetické svatební oznámení a oznámení těhotenství, u kterých si můžete snadno upravit texty (jména, datum, vzkazy). Je to nádherná vzpomínka, kterou vaši blízcí neztratí z očí."
    },
    {
        question: "Kolik stojí doprava a kdy mi zásilka magnetek dorazí?",
        answer: "Standardní doba výroby a expedice je 3 až 5 pracovních dní. Nabízíme doručení přes oblíbené služby jako Zásilkovna (výdejní místa i samoobslužné boxy Z-BOX), Balíkovna a PPL ParcelShop. Při nákupu nad 800 Kč je doručení kompletně ZDARMA!"
    },
    {
        question: "Lze objednat výhodné dárkové sady magnetek?",
        answer: "Ano! Pro maximální výhodnost nabízíme předpřipravené sady fotomagnetek v různých počtech (například oblíbené dárkové sady po 9 ks, 15 ks nebo 30 ks) za mimořádně nízké ceny. Je to skvělý dárek k narozeninám, Vánocům či výročí."
    }
];

const HowItWorksPage: React.FC = () => {
    const iconColors = ['bg-brand-cyan', 'bg-brand-purple', 'bg-brand-pink', 'bg-brand-orange'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-brand-purple tracking-wide uppercase">Jak to funguje</h2>
                    <p className="mt-1 text-4xl font-extrabold text-dark-gray sm:text-5xl sm:tracking-tight lg:text-6xl">Vytvořte si své vzpomínky ve 4 krocích</p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">Celý proces od výběru po objednávku je rychlý a jednoduchý.</p>
                </div>
                <div className="mt-20 grid md:grid-cols-2 gap-16">
                    {HOW_IT_WORKS_STEPS.map((step, index) => (
                         <div key={index} className="flex space-x-6 items-center">
                             <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full ${iconColors[index]} text-white`}>
                                 {step.icon}
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-dark-gray">{step.title}</h3>
                                 <p className="mt-2 text-base text-gray-500">{step.description}</p>
                             </div>
                         </div>
                    ))}
                </div>
                
                <div className="mt-20 text-center">
                    <Link to="/produkty" className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-pink/50">
                        VYTVOŘIT VLASTNÍ MAGNETKU
                    </Link>
                </div>

                <div className="mt-24 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-dark-gray">Proč si zamilujete naše magnetky?</h2>
                    
                    <div className="mt-12 text-left grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h3 className="text-xl font-bold text-dark-gray">Originální dárek, který potěší</h3>
                            <p className="mt-2 text-gray-600">
                                Hledáte osobní dárek pro partnera, babičku nebo kamarádku? Magnetka se společnou vzpomínkou je sázka na jistotu, která zaručeně vykouzlí úsměv.
                            </p>
                        </div>
                        <div>
                             <h3 className="text-xl font-bold text-dark-gray">Vaše vzpomínky stále na očích</h3>
                            <p className="mt-2 text-gray-600">
                                Připomeňte si každý den ty nejkrásnější momenty. Každý pohled na lednici vám připomene zážitky, které máte rádi.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-left">
                        <h3 className="text-xl font-bold text-dark-gray text-center mb-6">Ideální pro každou příležitost</h3>
                        <ul className="list-disc pl-6 space-y-4 max-w-2xl mx-auto text-gray-600">
                            <li><strong>Vzpomínky z cest:</strong> Vytvořte si sbírku magnetek z každé vaší dovolené.</li>
                            <li><strong>Rodinné okamžiky:</strong> Uchovejte si fotky dětí, rodinné oslavy nebo svatební den.</li>
                            <li><strong>Dárek z lásky:</strong> Perfektní maličkost k Valentýnu, výročí nebo jen tak pro radost.</li>
                            <li><strong>Pro domácí mazlíčky:</strong> Protože fotek roztomilých zvířátek není nikdy dost!</li>
                        </ul>
                    </div>
                </div>

                {/* FAQ Accordion Section */}
                <div className="mt-28 max-w-4xl mx-auto border-t border-gray-100 pt-20">
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold text-brand-purple uppercase tracking-widest bg-brand-purple/5 px-3 py-1.5 rounded-full">Odpovídáme na vaše dotazy</span>
                        <h2 className="text-3xl font-extrabold text-dark-gray tracking-tight mt-4 font-sans">
                            Často kladené otázky (FAQ)
                        </h2>
                        <p className="mt-2 text-base text-gray-500 font-normal">
                            Vše, co potřebujete vědět o výrobě fotomagnetek na lednici a doručení.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {FAQ_DATA.map((faq, index) => {
                            const isOpen = openFaqIndex === index;
                            return (
                                <div 
                                    key={index} 
                                    className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-brand-purple/40 shadow-sm' : 'border-gray-100 hover:border-gray-200/80'}`}
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                        className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-semibold text-gray-800 text-base sm:text-lg pr-4 font-sans leading-snug">
                                            {faq.question}
                                        </span>
                                        <span className="flex-shrink-0 ml-2">
                                            {isOpen ? (
                                                <div className="w-8 h-8 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </div>
                                            )}
                                        </span>
                                    </button>
                                    
                                    <div 
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-50 pt-4 font-normal">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <h3 className="text-2xl font-bold text-dark-gray">Připraveni oživit své fotky?</h3>
                    <p className="mt-2 text-gray-600">Nenechte své vzpomínky zapadnout. Stačí pár kliků a jsou na cestě k vám.</p>
                    <Link to="/produkty" className="mt-8 inline-block bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-orange text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-purple/50">
                        CHCI ZAČÍT TVOŘIT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper, SectionTitle } from '../components/layout/PageWrapper';

const TermsPage: React.FC = () => (
    <PageWrapper title="Obchodní podmínky">
        <SectionTitle>1. Úvodní ustanovení</SectionTitle>
        <p>Tyto obchodní podmínky platí pro nákup v internetovém obchodě Magnetic Memories provozovaném subjektem s IČO: 01764365 (dále jen "prodávající"). Podmínky blíže vymezují a upřesňují práva a povinnosti prodávajícího a kupujícího (zákazník).</p>
        <SectionTitle>2. Objednávka a uzavření kupní smlouvy</SectionTitle>
        <p>Veškeré objednávky podané prostřednictvím internetového obchodu jsou závazné. Podáním objednávky kupující stvrzuje, že se seznámil s těmito obchodními podmínkami a že s nimi souhlasí. Smlouva je uzavřena okamžikem potvrzení objednávky ze strany prodávajícího.</p>
        <SectionTitle>3. Cena a platební podmínky</SectionTitle>
        <p>Všechny ceny jsou uvedeny v Kč. Prodávající není plátcem DPH. Platbu je možné provést online platební kartou (pokud je k dispozici), bankovním převodem nebo na dobírku. Zboží je expedováno po připsání platby na účet prodávajícího (u převodu) nebo po potvrzení objednávky (u dobírky).</p>
        <SectionTitle>4. Odstoupení od smlouvy</SectionTitle>
        <p>Dle ustanovení § 1837 písm. d) občanského zákoníku nelze mimo jiné odstoupit od kupní smlouvy o dodávce zboží, které bylo upraveno podle přání spotřebitele nebo pro jeho osobu (zákazková výroba – např. produkty s vlastními fotografiemi nebo texty). <strong>U těchto personalizovaných produktů lze od smlouvy odstoupit pouze do okamžiku zahájení jejich výroby, která započíná po připsání platby na účet prodávajícího.</strong> Jakmile je zahájen proces výroby těchto produktů na míru, právo na odstoupení od smlouvy bez udání důvodu zaniká.</p>
        <p>Právo na odstoupení od smlouvy ve lhůtě 14 dnů bez udání důvodu v souladu s § 1829 odst. 1 občanského zákoníku se vztahuje pouze na nezakázkové produkty, které nebyly upraveny podle přání zákazníka (např. standardní motivy "Zamilovaných magnetů" bez vlastních úprav). V takovém případě musí být zboží vráceno nepoškozené a bez známek opotřebení.</p>
        <SectionTitle>5. Reklamace</SectionTitle>
        <p>Případné reklamace vyřídíme v souladu s platným právním řádem České republiky. Zjevné vady je nutné reklamovat ihned při převzetí zboží. Na pozdější reklamace zjevných vad nebude brán zřetel.</p>
        <SectionTitle>6. Péče o produkt a upozornění</SectionTitle>
        <p>Produkt není voděodolný a nesmí přijít do kontaktu s vodou. Jakákoliv mechanická manipulace může produkt také poškodit. Je určen výhradně pro umístění na magnetický povrch, nikoliv pro jinou manipulaci.</p>
        
        <SectionTitle>7. Postup pro odstoupení od smlouvy</SectionTitle>
        <p>V případě, že splňujete podmínky pro odstoupení od smlouvy (viz bod 4), zašlete prosím žádost prostřednictvím našeho kontaktního formuláře. V žádosti nezapomeňte uvést <strong>číslo vaší objednávky</strong> a datum nákupu.</p>
        <div className="mt-6 flex justify-center">
            <Link to="/kontakt" className="bg-brand-purple text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md">
                Přejít na kontaktní formulář
            </Link>
        </div>
    </PageWrapper>
);

export default TermsPage;

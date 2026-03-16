
export interface Saint {
  name: string;
  title?: string;
  bio: string;
  isMajor?: boolean;
}

export interface DayData {
  saints: Saint[];
  feast?: string;
  fasting?: 'none' | 'regular' | 'strict' | 'fish' | 'oil' | 'wine';
  fastingDescription?: string;
  historicalContext?: string;
  prayerTimes?: {
    matins?: string;
    vespers?: string;
    liturgy?: string;
  };
}

// This is a simplified map of major feasts and saints for demonstration.
// In a real production app, this would be a much larger database.
export const CALENDAR_DATA: Record<string, DayData> = {
  "01-01": {
    saints: [{ name: "Sveti Bonifatije", bio: "Mučenik koji je stradao za Hrista u Tarsu." }],
    historicalContext: "U srpskoj tradiciji, ovaj dan je početak građanske godine, ali crkvena godina počinje u septembru."
  },
  "01-07": {
    feast: "Božić - Rođenje Hristovo",
    saints: [{
      name: "Isus Hristos",
      bio: "Rođenje Gospoda i Spasa našega Isusa Hrista u Vitlejemu Judejskom."
    }],
    fasting: "none",
    historicalContext: "Božić je jedan od najradosnijih praznika u Srba. Tradicionalno se unosi badnjak, a porodica se okuplja oko česnice."
  },
  "01-09": {
    saints: [{
      name: "Sveti Stefan",
      title: "Arhiđakon i Prvomučenik",
      bio: "Prvi mučenik za Hrista, kamenovan od strane Jevreja jer je propovedao vaskrsenje Hristovo.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Sveti Stefan je krsna slava mnogih srpskih porodica, kao i Dan Republike Srpske."
  },
  "01-14": {
    feast: "Mali Božić / Sveti Vasilije Veliki",
    saints: [{
      name: "Sveti Vasilije Veliki",
      bio: "Veliki učitelj crkve, sastavljač liturgije i borac protiv jeresi.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Ovaj dan se u narodu slavi kao Srpska Nova godina (po Julijanskom kalendaru)."
  },
  "01-19": {
    feast: "Bogojavljenje",
    saints: [{ name: "Sveti Jovan Krstitelj", bio: "Krštenje Isusa Hrista u reci Jordan." }],
    historicalContext: "Tradicionalno plivanje za Časni krst u rekama širom Srbije i pravoslavnog sveta."
  },
  "01-20": {
    feast: "Sabor Svetog Jovana Krstitelja",
    saints: [{ name: "Sveti Jovan Krstitelj", bio: "Prorok i Preteča koji je najavio dolazak Hristov.", isMajor: true }],
    historicalContext: "Jovanjdan je jedna od najčešćih krsnih slava kod Srba."
  },
  "01-27": {
    feast: "Sveti Sava",
    saints: [{
      name: "Sveti Sava",
      title: "Prvi Arhiepiskop Srpski",
      bio: "Rastko Nemanjić, najmlađi sin Stefana Nemanje. Osnivač autokefalne Srpske pravoslavne crkve i prvi prosvetitelj.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Savindan je školska slava u Srbiji. Sveti Sava je postavio temelje srpske države, crkve i prosvete."
  },
  "02-14": {
    feast: "Sveti Trifun",
    saints: [{ name: "Sveti Trifun", bio: "Zaštitnik vinogradara i čuvar useva od štetočina." }],
    historicalContext: "Srpski vinogradari na ovaj dan prvi put u godini orezuju lozu i zalivaju je vinom."
  },
  "02-15": {
    feast: "Sretenje Gospodnje",
    saints: [{
      name: "Simeon Bogoprimac",
      bio: "Starac koji je primio malog Isusa u hramu u Jerusalimu."
    }],
    fasting: "none",
    historicalContext: "Dan državnosti Srbije. Na ovaj dan 1804. počeo je Prvi srpski ustanak u Orašcu, a 1835. donet je Sretenjski ustav."
  },
  "03-24": {
    saints: [{ name: "Sveti Sofronije", bio: "Patrijarh jerusalimski, branilac pravoslavlja." }],
    historicalContext: "Dan sećanja na žrtve NATO bombardovanja SR Jugoslavije koje je počelo 1999. godine."
  },
  "04-06": {
    saints: [{ name: "Sveti Artemon", bio: "Episkop seleukijski, učenik apostola Pavla." }],
    historicalContext: "Godišnjica nacističkog bombardovanja Beograda 1941. godine, čime je počeo Drugi svetski rat u Jugoslaviji."
  },
  "05-06": {
    feast: "Đurđevdan",
    saints: [{
      name: "Sveti Georgije",
      title: "Velikomučenik i Pobedonosac",
      bio: "Rimski vojnik koji je stradao za hrišćanstvo pod carem Dioklecijanom.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Đurđevdan je granica između zime i leta. U narodnim pesmama, to je vreme kada su se hajduci sastajali."
  },
  "05-12": {
    feast: "Sveti Vasilije Ostroški",
    saints: [{ name: "Sveti Vasilije Ostroški", bio: "Veliki čudotvorac i mitropolit zahumski. Njegove mošti počivaju u manastiru Ostrog.", isMajor: true }],
    historicalContext: "Jedan od najpoštovanijih svetitelja na Balkanu. Hiljade ljudi svih vera hodočaste u Ostrog na ovaj dan."
  },
  "05-24": {
    feast: "Sveti Ćirilo i Metodije",
    saints: [{ name: "Sveti Ćirilo i Metodije", bio: "Slovenski prosvetitelji i tvorci prvog slovenskog pisma - glagoljice." }],
    historicalContext: "Dan slovenske pismenosti i kulture."
  },
  "06-28": {
    feast: "Vidovdan",
    saints: [{
      name: "Sveti knez Lazar",
      bio: "Srpski knez koji je poginuo u Kosovskom boju 1389. godine braneći hrišćanstvo.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Sudbinski dan srpske istorije: Kosovska bitka (1389), Sarajevski atentat (1914), Vidovdanski ustav (1921)."
  },
  "07-12": {
    feast: "Petrovdan",
    saints: [{ name: "Sveti apostoli Petar i Pavle", bio: "Dva najveća apostola i širitelja hrišćanstva.", isMajor: true }],
    historicalContext: "U srpskom narodu se na ovaj dan pale lile (vatre od kore drveta) i mese kolači - petrovače."
  },
  "08-02": {
    feast: "Ilindan",
    saints: [{ name: "Sveti prorok Ilija", bio: "Starozavetni prorok koji je na ognjenim kolima uznet na nebo.", isMajor: true }],
    historicalContext: "U narodu poznat kao 'Ilija Gromovnik'. Čest praznik u srpskoj istoriji za podizanje ustanaka."
  },
  "08-28": {
    feast: "Velika Gospojina",
    saints: [{
      name: "Uspenje Presvete Bogorodice",
      bio: "Praznik posvećen usnuću i uznesenju majke Božije na nebo."
    }],
    fasting: "none",
    historicalContext: "Vreme između Velike i Male Gospojine (21. septembar) naziva se 'međudnevica' i smatra se najboljim za branje lekovitog bilja."
  },
  "09-21": {
    feast: "Mala Gospojina",
    saints: [{ name: "Rođenje Presvete Bogorodice", bio: "Rođenje Marije, majke Isusa Hrista." }],
    historicalContext: "Dan mnogih narodnih sabora i vašara širom Srbije."
  },
  "10-20": {
    saints: [{ name: "Sveti Sergije i Vakho", bio: "Rimski oficiri koji su stradali za veru." }],
    historicalContext: "Dan oslobođenja Beograda u Drugom svetskom ratu (1944. godine)."
  },
  "10-27": {
    feast: "Sveta Petka",
    saints: [{
      name: "Prepodobna mati Paraskeva",
      bio: "Svetiteljka srpskog porekla, veoma poštovana u celom pravoslavnom svetu kao zaštitnica žena.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Njene mošti su dugo počivale u Beogradu, u crkvi na Kalemegdanu, pre nego što su prenete u Jaši."
  },
  "10-31": {
    feast: "Sveti Luka / Sveti Petar Cetinjski",
    saints: [
      { name: "Sveti apostol Luka", bio: "Jevanđelist i prvi ikonopisac." },
      { name: "Sveti Petar Cetinjski", bio: "Mitropolit i vladar Crne Gore, tvorac moderne crnogorske države." }
    ],
    historicalContext: "U narodu se kaže: 'Sveti Luka, sneg do kuka'."
  },
  "11-08": {
    feast: "Mitrovdan",
    saints: [{
      name: "Sveti Dimitrije",
      title: "Velikomučenik Solunski",
      bio: "Zaštitnik grada Soluna, stradao za veru u 4. veku.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Mitrovdan je bio vreme kada su se hajduci rastajali i odlazili kod jataka na zimovnik ('Mitrovdanak - hajdučki rastanak')."
  },
  "11-21": {
    feast: "Aranđelovdan",
    saints: [{ name: "Sabor Svetog Arhangela Mihaila", bio: "Vođa nebeskih vojski i pobednik nad satonom.", isMajor: true }],
    historicalContext: "Druga najčešća krsna slava kod Srba. Veruje se da Arhangel Mihailo meri duše na onom svetu."
  },
  "12-19": {
    feast: "Sveti Nikola",
    saints: [{
      name: "Sveti Nikolaj Čudotvorac",
      title: "Arhiepiskop Mirlikijski",
      bio: "Jedan od najpoštovanijih svetitelja, poznat po milosrđu i zaštiti moreplovaca.",
      isMajor: true
    }],
    fasting: "none",
    historicalContext: "Najčešća krsna slava kod Srba. Kaže se da 'pola Srbije slavi, a druga polovina ide na slavu'."
  }
};

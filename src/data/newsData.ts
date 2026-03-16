export interface NewsItem {
  id: string;
  title: {
    en: string;
    sr: string;
  };
  url: string;
  date?: string;
}

export const SPC_NEWS: NewsItem[] = [
  {
    id: '1',
    title: {
      en: 'Let Christ be the center of our life',
      sr: 'Neka Hristos bude centar našeg života'
    },
    url: 'https://spc.rs/en/news/patriarch//15902.let-christ-be-the-center-of-our-life.html'
  },
  {
    id: '2',
    title: {
      en: 'The Serbian community in North Macedonia presented a Charter of gratitude to Patriarch Porfirije',
      sr: 'Srpska zajednica u Severnoj Makedoniji uručila Povelju zahvalnosti patrijarhu Porfiriju'
    },
    url: 'https://spc.rs/en/news/patriarch//15903.the-serbian-community-in-north-macedonia-presented-a-charter-of-gratitude-to-patriarch-porfirije.html'
  },
  {
    id: '3',
    title: {
      en: 'Communiqué of the Holy Synod of Bishops of the Serbian Orthodox Church',
      sr: 'Saopštenje Svetog Arhijerejskog Sinoda Srpske Pravoslavne Crkve'
    },
    url: 'https://spc.rs/en/news/patriarch//15789.communiqu%C3%A9-of-the-holy-synod-of-bishops-of-the-serbian-orthodox-church.html'
  },
  {
    id: '4',
    title: {
      en: 'A monumental work by Dr. Marguerite Peeters “The Gender Revolution – A Global Agenda?” presented to public',
      sr: 'Predstavljeno monumentalno delo dr Margerit Piters „Rodna revolucija – globalna agenda?“'
    },
    url: 'https://spc.rs/en/news/patriarch//15721.a-monumental-work-by-dr-marguerite-peeters-%E2%80%9Cthe-gender-revolution-%E2%80%93-a-global-agenda-presented-to-public.html'
  },
  {
    id: '5',
    title: {
      en: 'We are called to live in humility, repentance, and mercy, to struggle against haughtiness and arrogance within ourselves',
      sr: 'Pozvani smo da živimo u smirenju, pokajanju i milosrđu, da se borimo protiv gordosti i oholosti u sebi'
    },
    url: 'https://spc.rs/en/news/patriarch//15722.We-are-called-to-live-in-humility,-repentance,-and-mercy,-to-struggle-against-haughtiness-and-arrogance-within-ourselves.html'
  }
];

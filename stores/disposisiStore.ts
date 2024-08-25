import { defineStore } from 'pinia';

interface Disposisi {
  id: number;
  jenis: string;
  asalTujuan: string;
  tanggal: string;
}

interface DisposisiState {
  disposisiList: Disposisi[];
}

export const useDisposisiStore = defineStore('disposisi', {
  state: (): DisposisiState => ({
    disposisiList: [],
  }),
  actions: {
    addDisposisi(disposisi: Disposisi) {
      this.disposisiList.push({
        ...disposisi,
        id: this.disposisiList.length + 1,
      });
    },
  },
});

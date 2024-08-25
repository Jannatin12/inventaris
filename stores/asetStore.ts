import { defineStore } from 'pinia';

interface Aset {
  nama: string;
  merek: string;
  tipe: string;
  serialNumber: string;
  kondisiPembelian: string;
  tanggalPembelian: string;
  kondisiBarang: string;
  awalGaransi: string;
  akhirGaransi: string;
  umurBarang: string;
  keterangan: string;
}

export const useAsetStore = defineStore('asetStore', {
  state: () => ({
    assets: [
      {
        nama: 'Laptop',
        merek: 'Asus',
        tipe: 'Vivobook Pro 14x OLED',
        serialNumber: 'VF7LQLDT',
        kondisiPembelian: 'Baru',
        tanggalPembelian: '2022-01-15',
        kondisiBarang: 'Baik',
        awalGaransi: '2022-01-15',
        akhirGaransi: '2023-01-15',
        umurBarang: '1 tahun',
        keterangan: 'Digunakan oleh tim desain',
      },
      {
        nama: 'Handphone',
        merek: 'Apple',
        tipe: 'iPhone 13 Pro Max 256 GB',
        serialNumber: '85309958349058908345908',
        kondisiPembelian: 'Baru',
        tanggalPembelian: '2021-09-20',
        kondisiBarang: 'Baik',
        awalGaransi: '2021-09-20',
        akhirGaransi: '2022-09-20',
        umurBarang: '2 tahun',
        keterangan: 'Untuk manajer proyek',
      },
      {
        nama: 'Proyektor',
        merek: 'InFocus',
        tipe: 'IN112',
        serialNumber: 'P120Y3K7012',
        kondisiPembelian: 'Bekas',
        tanggalPembelian: '2020-05-10',
        kondisiBarang: 'Cukup',
        awalGaransi: '2020-05-10',
        akhirGaransi: '2021-05-10',
        umurBarang: '3 tahun',
        keterangan: 'Digunakan di ruang meeting',
      },
    ] as Aset[],
  }),
  actions: {
    getAssets() {
      return this.assets;
    },
    addAsset(newAsset: Aset) {
      this.assets.push(newAsset);
    },
    editAsset(index: number, updatedAsset: Aset) {
      this.assets[index] = updatedAsset;
    },
    deleteAsset(index: number) {
      this.assets.splice(index, 1);
    },
  },
});

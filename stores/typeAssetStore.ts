import { defineStore } from 'pinia';

export const useTypeAssetStore = defineStore('typeAssetStore', {
  state: () => ({
    typeAssets: [
      { nama: 'Laptop' },
      { nama: 'Handphone' },
      { nama: 'Proyektor' },
    ],
  }),
  actions: {
    addTypeAsset(newAsset: { nama: string }) {
      this.typeAssets.push(newAsset);
    },
    getTypeAssets() {
      return this.typeAssets;
    },
    editTypeAsset(index: number, updatedAsset: { nama: string }) {
      this.typeAssets[index] = updatedAsset;
    },
    deleteTypeAsset(index: number) {
      this.typeAssets.splice(index, 1);
    },
  },
});

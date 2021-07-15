import {ComponentCustomProperties} from "vue";

declare namespace Props {
  type Goods = GoodsItem[]

  interface GoodsItem {
    src: string
    name: string
    prince: string
  }
}


declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filter: {
      prefix: (src: string) => string
    }
  }
}

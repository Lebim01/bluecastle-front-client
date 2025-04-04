export interface FormValues {
    name: string;
    whatsapp: string;
    state: string;
    city: string;
  }
  export interface FormErrors {
    [key: string]: string;
  }

  export interface FormSignals {
    par: string
    order_type:string
    entry_price: string
    stop_loss: string
    take_profit_1: string
    take_profit_2: string
    take_profit_3: string
    img_analisis:  null,
    notes: string,
  }
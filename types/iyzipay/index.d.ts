// Type definitions for iyzipay 2.0
// Project: https://github.com/iyzico/iyzipay-node
// Definitions by: My Self <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = Iyzipay;

interface IyzipayConfig {
  apiKey: string;
  secretKey: string;
  uri: string;
}

declare class Iyzipay {
  constructor(config?: IyzipayConfig);

  checkoutForm: {
    retrieve: (
      request: Iyzipay.IyziStartRetrieveCheckoutForm,
      callback: (
        err?: Iyzipay.ErrorCode,
        result?: Iyzipay.IyziStartRetrieveCheckoutFormResponse
      ) => void
    ) => void;
  };

  checkoutFormInitialize: {
    create: (
      request: Iyzipay.IyziStartPaymentForm,
      callback: (
        err?: Iyzipay.ErrorCode,
        result?: Iyzipay.IyziStartPaymentFormResponse
      ) => void
    ) => void;
  };

  cancel: {
    create: (
      request: Iyzipay.IyziStartCancelPaymentApi,
      callback: (
        err?: Iyzipay.ErrorCode,
        result?: Iyzipay.IyziStartCancelPaymentApiResponse
      ) => void
    ) => void;
  };
}

declare namespace Iyzipay {
  interface IyziStartPaymentApi {
    /**
     * Taksit bilgisi, tek çekim için 1 gönderilmelidir. Geçerli değerler: 1, 2, 3, 6, 9, 12.
     */
    installment: "1" | "2" | "3" | "6" | "9" | "12";
  }
  interface IyziStartPaymentApiResponse {}

  interface IyziStartCancelPaymentApi {
    /**
     * iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır. Varsayılan değeri tr’dir.
     */
    locale?: typeof LOCALE[LOCALE_KEYS];

    /**
     * İstek esnasında gönderip, sonuçta alabileceğiniz bir değer, request/response eşleşmesi yapmak için kullanılabilir.
     */
    conversationId?: string;

    /**
     * iyzico tarafından işleme verilen benzersiz ödeme numarası.
     */
    paymentId: string;

    /**
     * İşlemin gönderildiği ip adresi.
     */
    ip: string;
  }
  interface IyziStartCancelPaymentApiResponse extends ErrorCode {
    /**
     * Ödeme sepet tutarı.
     */
    price: string;

    /**
     * İptali yapılan ödeme para birimi.
     */
    currency: typeof CURRENCY[CURRENCY_KEYS];

    /**
     * iyzico tarafından işleme verilen benzersiz ödeme numarası.
     */
    paymentId: number;

    /**
     * Yapılan isteğin sonucunu bildirir. İşlem başarılı ise success, hatalı ise failure döner.
     */
    status: "success" | "failure";

    /**
     * İstekte belirtilen locale değeri geri dönülür, varsayılan değeri tr'dir.
     */
    locale?: typeof LOCALE[LOCALE_KEYS];

    /**
     * Dönen sonucun o anki unix timestamp değeridir.
     */
    systemTime: number;

    /**
     * İstek esnasında gönderilmişse, sonuçta aynen geri iletilir.
     */
    conversationId: string;
  }

  interface IyziStartPaymentApi3D {}
  interface IyziStartPaymentApiResponse3D {}

  interface IyziStartPaymentForm {
    /**
     * iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır. Varsayılan değeri tr’dir.
     */
    locale?: typeof LOCALE[LOCALE_KEYS];

    /**
     * İstek esnasında gönderip, sonuçta alabileceğiniz bir değer, request/response eşleşmesi yapmak için kullanılabilir.
     */
    conversationId?: string;

    /**
     * Ödeme sepet tutarı. Kırılım tutarlar toplamı, sepet tutarına eşit olmalı.
     */
    price: string;

    /**
     * İndirim, vergi gibi değerlerin dahil edildiği, vade farkı öncesi tutar değeri.
     */
    paidPrice: string;

    /**
     * Para birimi. Default değeri TL’dir. Kullanılabilen diğer değerler ise USD, EUR, GBP ve IRR’dir.
     */
    currency: typeof CURRENCY[CURRENCY_KEYS];

    /**
     * Taksit bilgisi, geçerli değerler: 1, 2, 3, 6, 9.
     */
    enabledInstallments: (1 | 2 | 3 | 6 | 9)[];

    /**
     * Üye işyeri sepet id’si.
     */
    basketId?: string;

    /**
     * Ödeme kanalı. Geçerli değerler enum içinde sunulmaktadır: WEB, MOBILE, MOBILE_WEB, MOBILE_IOS, MOBILE_ANDROID, MOBILE_WINDOWS, MOBILE_TABLET, MOBILE_PHONE
     */
    paymentChannel?: typeof PAYMENT_CHANNEL[PAYMENT_CHANNEL_KEYS];

    /**
     * Ödeme grubu, varsayılan PRODUCT. Geçerli değerler enum içinde sunulmaktadır: PRODUCT, LISTING, SUBSCRIPTION
     */
    paymentGroup?: typeof PAYMENT_GROUP[PAYMENT_GROUP_KEYS];

    /**
     * Ödeme akışında üye işyerine başarılı ve hatalı sonucu bildirmek üzere alınan URL adresi.
     */
    callbackUrl: string;

    buyer: Buyer;
    billingAddress: BillingAddress;
    shippingAddress: ShippingAddress;
    basketItems: BasketItem[];
  }
  interface IyziStartPaymentFormResponse extends ErrorCode {
    checkoutFormContent: string;
    paymentPageUrl: string;
    token: string;
    tokenExpireTime: number;
    status: "success" | "failure";
    locale: typeof LOCALE[LOCALE_KEYS];
    systemTime: number;
    conversationId: string;
  }

  interface IyziStartRetrieveCheckoutForm {
    /**
     * iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır. Varsayılan değeri tr’dir.
     */
    locale?: typeof LOCALE[LOCALE_KEYS];

    /**
     * İstek esnasında gönderip, sonuçta alabileceğiniz bir değer, request/response eşleşmesi yapmak için kullanılabilir.
     */
    conversationId?: string;

    /**
     * Checkout form için oluşturulan tekil değer. Her istek için özel üretilir ve işyerine dönülür. Ödemenin sonucunu öğrenmek için zorunlu bir alandır.
     */
    token: string;
  }
  interface IyziStartRetrieveCheckoutFormResponse extends ErrorCode {
    /**
     * Checkout form için oluşturulan tekil değer. Her istek için özel üretilir ve işyerine dönülür. Ödemenin sonucunu öğrenmek için zorunlu bir alandır.
     */
    token: string;

    /**
     * Ödeme akışında üye işyerine başarılı ve hatalı sonucu bildirmek üzere alınan URL adresi.
     */
    callbackUrl: string;

    /**
     * Yapılan isteğin sonucunu bildirir. Başarılı ise success, hatalı ise failure döner.
     */
    status: "success" | "failure";

    /**
     * Ödeme isteğinin durumunu gösterir. Success ise karttan ilgili tutar çekilmiştir. SUCCESS, FAILURE, INIT_THREEDS, CALLBACK_THREEDS, BKM_POS_SELECTED, CALLBACK_PECCO
     */
    paymentStatus: typeof PAYMENT_STATUS[PAYMENT_STATUS_KEYS];

    /**
     * İstekte belirtilen locale değeri geri dönülür, varsayılan değeri tr’dir.
     */
    locale?: typeof LOCALE[LOCALE_KEYS];

    /**
     * Dönen sonucun o anki unix timestamp değeridir.
     */
    systemTime: string;

    /**
     * İstek esnasında gönderilmişse, sonuçta aynen geri iletilir.
     */
    conversationId: string;

    /**
     * Ödemeye ait id, üye işyeri tarafından mutlaka saklanmalıdır. Ödemenin iptali ve iyzico ile iletişimde kullanılır.
     */
    paymentId: string;

    /**
     * Ödeme sepet tutarı. Kırılım tutarlar toplamı sepet tutarına eşit olmalı.
     */
    price: string;

    /**
     * İndirim vade farkı vs. hesaplanmış POS’tan geçen, tahsil edilen, nihai tutar.
     */
    paidPrice: string;

    /**
     * Ödemenin alındığı para birimi.
     */
    currency: typeof CURRENCY[CURRENCY_KEYS];

    /**
     * Ödemenin taksit bilgisi, tek çekim için 1 döner. Geçerli değerler: 1, 2, 3, 6, 9, 12
     */
    installment: "1" | "2" | "3" | "6" | "9" | "12";

    /**
     * Üye işyeri tarafından gönderilen sepet id’si.
     */
    basketId: string;

    /**
     * Ödeme yapılan kartın ilk 6 hanesi.
     */
    binNumber: string;

    /**
     * Ödeme yapılan kartın son 4 hanesi.
     */
    lastFourDigits: string;

    /**
     * Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu kuruluş. Geçerli değerler: VISA, MASTER_CARD, AMERICAN_EXPRESS, TROY
     */
    cardAssociation: string;

    /**
     * Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu aile. Geçerli değerler: Bonus, Axess, World, Maximum, Paraf, CardFinans, Advantage
     */
    cardFamily: string;

    /**
     * Eğer ödeme yapılan kart yerel bir kart ise, kartın ait olduğu tipi. Geçerli değerler: CREDIT_CARD, DEBIT_CARD, PREPAID_CARD
     */
    cardType: string;

    /**
     * Ödeme işleminin fraud filtrelerine göre durumu. Eğer ödemenin fraud risk skoru düşük ise ödemeye anında onay verilir bu durumda 1 değeri döner. Eğer fraud risk skoru yüksek ise ödeme işlemi reddedilir ve -1 döner. Eğer ödeme işlemi daha sonradan incelenip karar verilecekse 0 döner. Geçerli değerler: 0, -1 ve 1. Üye işyeri sadece 1 olan işlemlerde ürünü kargoya vermelidir, 0 olan işlemler için bilgilendirme beklemelidir.
     */
    fraudStatus: 0 | 1 | -1;

    /**
     * Ödemeye ait iyzico işlem ücreti .
     */
    iyziCommissionFee: string;

    /**
     * Decimal	Ödemeye ait iyzico işlem komisyon tutarı.
     */
    iyziCommissionRateAmount: string;

    /**
     * Üye işyerinin uyguladığı vade/komisyon oranı. Örneğin price=100, paidPrice=110 ise üye işyeri vade/komisyon oranı %10’dur. Bilgi amaçlıdır.
     */
    merchantCommissionRate: string;

    /**
     * Üye işyerinin uyguladığı vade/komisyon tutarı. Örneğin price=100, paidPrice=110 ise üye işyeri vade/komisyon tutarı 10’dur. Bilgi amaçlıdır.
     */
    merchantCommissionRateAmount: string;

    itemTransactions: ItemTransaction[];

    /**
     * Bankadan dönen değerdir. Sadece ödeme başarısız ise ve işlem 3ds ile yapılmışsa bu değer döner. 0,2,3,4,5,6,7 değerlerini alabilir.
     */
    mdStatus: string;
  }

  interface Buyer {
    /**
     * Üye işyeri tarafındaki alıcıya ait id.
     */
    id: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait ad.
     */
    name: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait soyad.
     */
    surname: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait GSM numarası.
     */
    gsmNumber?: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait e-posta bilgisi. E-posta adresi alıcıya ait geçerli ve erişilebilir bir adres olmalıdır.
     */
    email: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait kimlik (TCKN) numarası.
     */
    identityNumber: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait son giriş tarihi. Tarih formatı 2015- 09-17 23:45:06 şeklinde olmalıdır.
     */
    lastLoginDate?: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait kayıt tarihi. Tarih formatı 2015-09- 17 23:45:06 şeklinde olmalıdır.
     */
    registrationDate?: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait kayıt adresi.
     */
    registrationAddress: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait IP adresi.
     */
    ip: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait şehir bilgisi.
     */
    city: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait ülke bilgisi.
     */
    country: string;

    /**
     * Üye işyeri tarafındaki alıcıya ait posta kodu.
     */
    zipCode?: string;
  }

  interface Address {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode?: string;
  }

  interface BillingAddress extends Address {}
  interface ShippingAddress extends Address {}

  interface BasketItem {
    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait id. Not: Bir ödeme isteğine maksimum 500 basketItem eklenebilir.
     */
    id: string;

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait tip. Geçerli enum değerler: PHYSICAL ve VIRTUAL
     */
    itemType: typeof BASKET_ITEM_TYPE[BASKET_ITEM_TYPE_KEYS];

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait ismi.
     */
    name: string;

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait kategori 1.
     */
    category1: string;

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait kategori 2.
     */
    category2?: string;

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait tutar. 0 ve 0’dan küçük olamaz, tutarlar toplamı sepet tutarına (price) eşit olmalıdır.
     */
    price: string;
  }

  interface ItemTransaction {
    /**
     * Ödeme kırılımına ait id, üye işyeri tarafından mutlaka saklanmalıdır. Ödeme kırılımının iadesi, onayı, onay geri çekmesi ve iyzico ile iletişimde kullanılır. Tercihen itemId ile ilişkili bir şekilde tutulmalıdır.
     */
    paymentTransactionId: string;

    /**
     * Üye işyeri tarafından iletilen, sepetteki ürüne ait id.
     */
    itemId: string;

    /**
     * Üye işyeri tarafındaki sepetteki ürüne ait tutar.
     */
    price: string;

    /**
     * Tahsilat tutarının kırılım bazındaki dağılımı. Üye işyeri tarafından mutlaka saklanmalıdır.
     */
    paidPrice: string;

    /**
     * Ödeme kırılımının durumu. Ödeme fraud kontrolünde ise 0 değeri döner, bu durumda fraudStatus değeri de 0’dır. Ödeme, fraud kontrolünden sonra reddedilirse -1 döner. Pazaryeri modelinde ürüne onay verilene dek bu değer 1 olarak döner. Pazaryeri modelinde ürüne onay verilmişse bu değer 2 olur. Geçerli değerler: 0, -1, 1, 2.
     */
    transactionStatus: 0 | -1 | 1 | 2;

    /**
     * Kırılım bazında üye işyeri blokaj oranı. iyzico – üye işyeri anlaşmasına göre, üye işyerine işlem bazında blokaj uygulayabilir. Bu blokaj üye işyeri fraud riskini önlemek içindir, blokaj süresi boyunca para iyzico’da tutulur, bu süre sonrasında üye işyerine gönderilir.
     */
    blockageRate: string;

    /**
     * Kırılım bazında üye işyeri blokaj tutarının, üye işyerine yansıyan rakamı. Blokaj tutarı mümkün olduğunca üye işyerine yansıtılır. Eğer blokaj tutarı, üye işyeri tutarından daha büyükse bu durumda alt üye işyerine de yansıtılır.
     */
    blockageRateAmountMerchant: string;

    /**
     * İşlem bazında blokaj çözülme tarihi. yyyy-MM-dd HH:mm:ss formatındadır, örneğin 2015-10-19 14:36:52.
     */
    blockageResolvedDate: string;

    /**
     * iyzico işlem ücretinin kırılım bazında dağılmış tutarı.
     */
    iyziCommissionFee: string;

    /**
     * iyzico işlem komisyon tutarının kırılım bazında dağılmış tutarı.
     */
    iyziCommissionRateAmount: string;

    /**
     * Üye işyerinin uyguladığı vade/komisyon oranının kırılım bazında dağılmış oranı.
     */
    merchantCommissionRate: string;

    /**
     * Üye işyerinin uyguladığı vade/komisyon tutarıın, kırılım bazında dağılmış tutarı.
     */
    merchantCommissionRateAmount: string;

    /**
     * Bu kırılım için, iyzico işlem ücreti, komisyon tutarı ve blokajlar düşüldükten sonra üye işyerine gönderilecek tutar.
     */
    merchantPayoutAmount: string;

    convertedPayout: ConvertedPayout;
  }

  interface ConvertedPayout {
    /**
     * Tahsilat tutarının kırılım bazındaki dağılımı. Üye işyeri tarafından mutlaka saklanmalıdır.
     */
    paidPrice: string;

    /**
     * iyzico işlem ücretinin kırılım bazında dağılmış tutarı.
     */
    iyziCommissionFee: string;

    /**
     * iyzico işlem komisyon tutarının kırılım bazında dağılmış tutarı.
     */
    iyziCommissionRateAmount: string;

    /**
     * Kırılım bazında üye işyeri blokaj tutarının, üye işyerine yansıyan rakamı. Blokaj tutarı mümkün olduğunca üye işyerine yansıtılır. Eğer blokaj tutarı, üye işyeri tutarından daha büyükse bu durumda alt üye işyerine de yansıtılır.
     */
    blockageRateAmountMerchant: string;

    /**
     * Bu kırılım için, iyzico işlem ücreti, komisyon tutarı ve blokajlar düşüldükten sonra üye işyerine gönderilecek tutar.
     */
    merchantPayoutAmount: string;

    /**
     * Bu kırılım için, iyzico işlem ücreti, komisyon tutarı ve blokajlar düşüldükten sonra üye işyerine gönderilecek tutar.
     */
    iyziConversationRate: string;

    /**
     * Bu kırılım için, iyzico işlem ücreti, komisyon tutarı ve blokajlar düşüldükten sonra üye işyerine gönderilecek tutar.
     */
    iyziConversationRateAmount: string;

    /**
     * Ödemenin alındığı para birimi.
     */
    currency: typeof CURRENCY[CURRENCY_KEYS];
  }

  interface ErrorCode {
    errorCode: string;
    errorMessage: string;
    errorGroup: string;
  }

  type PAYMENT_STATUS_KEYS = keyof typeof PAYMENT_STATUS;

  const PAYMENT_STATUS: {
    SUCCESS: string;
    FAILURE: string;
    INIT_THREEDS: string;
    CALLBACK_THREEDS: string;
    BKM_POS_SELECTED: string;
    CALLBACK_PECCO: string;
  };

  type LOCALE_KEYS = keyof typeof LOCALE;

  const LOCALE: {
    TR: string;
    EN: string;
  };

  type PAYMENT_GROUP_KEYS = keyof typeof PAYMENT_GROUP;

  const PAYMENT_GROUP: {
    PRODUCT: string;
    LISTING: string;
    SUBSCRIPTION: string;
  };

  type BASKET_ITEM_TYPE_KEYS = keyof typeof BASKET_ITEM_TYPE;

  const BASKET_ITEM_TYPE: {
    PHYSICAL: string;
    VIRTUAL: string;
  };

  type PAYMENT_CHANNEL_KEYS = keyof typeof PAYMENT_CHANNEL;

  const PAYMENT_CHANNEL: {
    MOBILE: string;
    WEB: string;
    MOBILE_WEB: string;
    MOBILE_IOS: string;
    MOBILE_ANDROID: string;
    MOBILE_WINDOWS: string;
    MOBILE_TABLET: string;
    MOBILE_PHONE: string;
  };

  const SUB_MERCHANT_TYPE: {
    PERSONAL: string;
    PRIVATE_COMPANY: string;
    LIMITED_OR_JOINT_STOCK_COMPANY: string;
  };

  type CURRENCY_KEYS = keyof typeof CURRENCY;

  const CURRENCY: {
    TRY: string;
    EUR: string;
    USD: string;
    IRR: string;
    GBP: string;
    NOK: string;
    RUB: string;
    CHF: string;
  };

  const APM_TYPE: {
    SOFORT: string;
    IDEAL: string;
    QIWI: string;
    GIROPAY: string;
  };

  const REFUND_REASON: {
    DOUBLE_PAYMENT: string;
    BUYER_REQUEST: string;
    FRAUD: string;
    OTHER: string;
  };

  const PLAN_PAYMENT_TYPE: {
    RECURRING: string;
  };

  const SUBSCRIPTION_PRICING_PLAN_INTERVAL: {
    DAILY: string;
    WEEKLY: string;
    MONTHLY: string;
    YEARLY: string;
  };

  const SUBSCRIPTION_UPGRADE_PERIOD: {
    NOW: string;
  };

  const SUBSCRIPTION_STATUS: {
    EXPIRED: string;
    UNPAID: string;
    CANCELED: string;
    ACTIVE: string;
    PENDING: string;
    UPGRADED: string;
  };

  const SUBSCRIPTION_INITIAL_STATUS: {
    ACTIVE: string;
    PENDING: string;
  };
}

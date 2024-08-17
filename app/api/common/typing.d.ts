declare namespace API {
  type ResponsTpl<T = any> = {
    success: boolean;
    message?: string;
    data: T;
    total?: number;
  };
}

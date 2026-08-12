declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        address: string;
      };
    }
  }
}

export {}
export interface IPortfolio extends Document {
  portfolioName: string;
  portfolioLink: string;
  portfolioOwnerName: string;
  portfolioImage: string;
  type: 'personal' | 'professional' | 'agency' | 'other';
  createdAt: Date;
  updatedAt: Date;
}
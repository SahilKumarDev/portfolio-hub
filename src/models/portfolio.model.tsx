import mongoose, { Schema } from "mongoose";
import { IPortfolio } from "@/types/portfolio.type";

const PortfolioSchema = new Schema<IPortfolio>(
  {
    portfolioName: {
      type: String,
      required: [true, "Portfolio name is required"],
      trim: true,
      maxlength: [100, "Portfolio name cannot be more than 100 characters"],
    },
    portfolioLink: {
      type: String,
      required: [true, "Portfolio link is required"],
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
            v
          );
        },
        message: "Please enter a valid URL",
      },
    },
    portfolioOwnerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
      maxlength: [50, "Owner name cannot be more than 50 characters"],
    },
    portfolioImage: {
      type: String,
      required: [true, 'Portfolio image is required'], // Ensure a descriptive error message
    },
    portfolioOwnerImage: {
      type: String,
      required: [true, 'Portfolio owner image is required'],
    },
    type: {
      type: String,
      required: [true, "Portfolio type is required"],
      enum: {
        values: ["personal", "professional", "agency", "other"],
        message: "{VALUE} is not supported as portfolio type",
      },
      default: "personal",
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio =
  mongoose.models.Portfolio ||
  mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

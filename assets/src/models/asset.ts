import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AssetAttrs {
  title: string;
  price: number;
}

interface AssetDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  orderId?: string;
}

interface AssetModel extends mongoose.Model<AssetDoc> {
  build(attrs: AssetAttrs): AssetDoc;
}

const assetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
assetSchema.set('versionKey', 'version');
assetSchema.plugin(updateIfCurrentPlugin);

assetSchema.statics.build = (attrs: AssetAttrs) => {
  return new Asset(attrs);
};

const Asset = mongoose.model<AssetDoc, AssetModel>('Asset', assetSchema);

export { Asset };

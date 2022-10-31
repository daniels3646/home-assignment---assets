import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface AssetAttrs {
  id: string;
  ip: string;
  name: string;
  dateCreated: Date;
  description: string;
}

export interface AssetDoc extends mongoose.Document {
  ip: string;
  name: string;
  description: string;
  dateCreated: Date;
  version: number;
}

interface AssetModel extends mongoose.Model<AssetDoc> {
  build(attrs: AssetAttrs): AssetDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<AssetDoc | null>;
}

const assetSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    dateCreated: {
      type: Date,
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

assetSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Asset.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

assetSchema.statics.build = (attrs: AssetAttrs) => {
  return new Asset({
    _id: attrs.id,
    ip: attrs.ip,
    name: attrs.name,
    description: attrs.description,
    dateCreated: attrs.dateCreated,
  });
};

const Asset = mongoose.model<AssetDoc, AssetModel>('Asset', assetSchema);

export { Asset };

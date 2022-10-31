import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { ScanStatus } from '../utils';
import { AssetDoc } from './asset';

export { ScanStatus };

interface ScanAttrs {
  status: ScanStatus;
  startsAt: Date;
  asset: AssetDoc;
}

interface ScanDoc extends mongoose.Document {
  status: ScanStatus;
  startsAt: Date;
  asset: AssetDoc;
  version: number;
}

interface ScanModel extends mongoose.Model<ScanDoc> {
  build(attrs: ScanAttrs): ScanDoc;
}

const scanSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: Object.values(ScanStatus),
      default: ScanStatus.Pending,
    },
    startsAt: {
      type: mongoose.Schema.Types.Date,
    },
    asset: {
      index: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
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

scanSchema.set('versionKey', 'version');
scanSchema.plugin(updateIfCurrentPlugin);

scanSchema.statics.build = (attrs: ScanAttrs) => {
  return new Scan(attrs);
};

const Scan = mongoose.model<ScanDoc, ScanModel>('Scan', scanSchema);

export { Scan };

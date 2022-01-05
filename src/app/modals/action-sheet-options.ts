import { AnimationBuilder } from "@angular/animations";
import { JSXBase } from '@stencil/core/internal';

export interface ActionSheetButton<T = any> {
  text?: string;
  role?: 'cancel' | 'destructive' | 'selected' | string;
  icon?: string;
  cssClass?: string | string[];
  handler?: () => boolean | void | Promise<boolean | void>;
  data?: T;
}

export interface ActionSheetOptions {
    header?: string;
  subHeader?: string;
  cssClass?: string | string[];
  buttons: (ActionSheetButton | string)[];
  backdropDismiss?: boolean;
  translucent?: boolean;
  animated?: boolean;
  // mode?: Mode;
  keyboardClose?: boolean;
  id?: string;
  htmlAttributes?: ActionSheetAttributes;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

export interface ActionSheetAttributes extends JSXBase.HTMLAttributes<HTMLElement> {} {
}
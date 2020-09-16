import { Backdrop, BackdropProps as InternalBackdropProps } from "./Backdrop";
import {
  Modal,
  ModalCloseEvent as InternalModalCloseEvent,
  ModalProps as InternalModalProps,
} from "./Modal";

export { Backdrop, Modal };
export type BackdropProps = InternalBackdropProps;
export type ModalCloseEvent = InternalModalCloseEvent;
export type ModalProps = InternalModalProps;

import { lockScroll, RestoreStyle } from "./LockScroll";

interface Container {
  container: HTMLElement;
  modals: ModalMount[];
  restoreStyle: RestoreStyle | null;
}

export interface ModalMount {
  modal: Element | null;
  mountNode: Element | null;
}

export interface MountOptions {
  shouldLockScroll?: boolean;
}

export class ModalManager {
  containers: Container[] = [];
  modals: ModalMount[] = [];

  add(modal: ModalMount, container: HTMLElement) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return;
    }

    this.modals.push(modal);

    const existingContainer = this.containers.find(
      (element) => element.container === container
    );

    if (existingContainer) {
      existingContainer.modals.push(modal);
    } else {
      this.containers.push({
        container,
        modals: [modal],
        restoreStyle: null,
      });
    }
  }

  isTopModal(modal: ModalMount): boolean {
    return (
      this.modals.length > 0 && this.modals[this.modals.length - 1] === modal
    );
  }

  mount(modal: ModalMount, options: MountOptions) {
    const containerIndex = this.containers.findIndex(
      (element) => element.modals.indexOf(modal) !== -1
    );
    if (containerIndex === -1) {
      throw new Error("Failed to find a container with the given modal.");
    }

    const container = this.containers[containerIndex];
    if (!container.restoreStyle) {
      container.restoreStyle = lockScroll(container.container, options);
    }
  }

  remove(modal: ModalMount) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return;
    }

    const containerIndex = this.containers.findIndex(
      (element) => element.modals.indexOf(modal) !== -1
    );
    if (containerIndex === -1) {
      throw new Error("Failed to find a container with the given modal.");
    }

    const container = this.containers[containerIndex];

    container.modals.splice(container.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    if (container.modals.length === 0) {
      if (container.restoreStyle) {
        container.restoreStyle();
      }
      this.containers.splice(containerIndex, 1);
    }
  }
}

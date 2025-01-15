import * as React from 'react';
import * as H from 'history';
import { RouteComponentProps, Omit } from 'react-router';

export interface ChildData {
  isActive: boolean;
  action: H.Action | undefined;
  nextLocation: H.Location | undefined;
  onCancel: () => void;
  onConfirm: () => void;
  onSkip: (nextLocation: H.Location | string | URL, action?: H.Action) => void;
}

export interface NavigationPromptProps extends RouteComponentProps<any> {
  children: (data: ChildData) => React.ReactNode;
  when: boolean | ((currentLocation: H.Location, nextLocation?: H.Location, action?: H.Action) => boolean);
  afterCancel?: () => void;
  afterConfirm?: () => void;
  afterSkip?: () => void;
  allowGoBack?: boolean;
  beforeCancel?: (callback: Function) => void;
  beforeConfirm?: (callback: Function) => void;
  beforeSkip?: (callback: Function) => void;
  onShow?: (data: {action: H.Action, nextLocation: H.Location, onCancel: () => void, onConfirm: () => void, onSkip: (nextLocation: H.Location | string | URL, action?: H.Action) => void}) => void;
  onShowNative?: () => void;
  renderIfNotActive?: boolean;
  disableNative?: boolean;
}

interface NavigationPromptState {
  action?: H.Action;
  nextLocation?: H.Location;
  isActive: boolean;
  unblock: () => void;
}

interface NavigationPromptWithRouter extends React.Component<NavigationPromptProps, NavigationPromptState> {
  _prevUserAction: string;
  _isMounted: boolean;

  block(nextLocation: H.Location, action: H.Action): boolean;
  navigateToNextLocation(): void;
  navigateTo(nextLocation: H.Location | string, action?: H.Action): void;
  onCancel(): void;
  onConfirm(): void;
  onSkip(nextLocation: H.Location | string | URL, action?: H.Action): void;
  onBeforeUnload(e: any): string
  when(nextLocation?: H.Location, action?: H.Action): boolean;
}

// This is for the withRouter HOC being used as the default export.
export default class NavigationPrompt extends React.Component<Omit<NavigationPromptProps, keyof RouteComponentProps<any>>> {}

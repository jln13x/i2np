declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends AuthenticatedScreensStack {}
  }
}

export type AuthenticatedScreensStack = {
  Home: undefined;
  UploadImage: undefined;
  SearchPageOrDatabase: undefined;
  Result: undefined;
  CreatePage: undefined;
  Profile: undefined;
};

export type UnauthenticatedScreensStack = {
  Login: undefined;
};

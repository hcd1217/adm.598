interface AsideNavLink {
  group: string;
  title: string;
  icon: string | React.ElementType;
  access?: (role: IUser["role"]) => boolean;
  route: (user: IUser | null, params: Params) => string;
  exact?: boolean;
  comming?: boolean;
}

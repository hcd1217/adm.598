interface IAsideNavLink {
  group: string;
  title: string;
  icon: string | React.ElementType;
  access?: (role: IUser["role"]) => boolean;
  route: (user: IUser | null, params: Params) => string;
  exact?: boolean;
  coming?: boolean;
  badge?: string | number;
  id: string;
}

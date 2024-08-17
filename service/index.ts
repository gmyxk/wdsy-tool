export const queryAllRolesApi = () =>
  fetch("/api/roles").then<API.ResponsTpl<API.UserListItem[]>>((res) =>
    res.json()
  );

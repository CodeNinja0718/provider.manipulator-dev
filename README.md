==========  provider.manipulator-dev  =========

## Client Data Fetching

Because this source is using [React Query](https://tanstack.com/query/v4/?from=reactQueryV3&original=https://react-query-v3.tanstack.com/) for fetching and managing data from server. It has some hooks based on react-query. Please follow the those ways for fetching data

- #### Fetch a detail (Normally method GET)**

Using in a component
```
import { useFetch } from 'hooks';
import exampleQuery from 'models/example/query';
import type { IExample } from 'models/example/interface';
...
const { data } = useFetch<IExample>(exampleQuery.exampleDetail)
// OR
const { exampleId } = query; 
const { data } = useFetch<IExample>(exampleQuery.exampleDetail(exampleId as string))
```

**models/example/query.ts**
```
const exampleQuery = {
  exampleFetch: (id: string) => ({
    queryKey: ['public', 'articleDetail', id],
    apiUrl: `/exmaples/${id}`,
  }),
  ...
};
// OR
const exampleQuery = {
  exampleFetch: {
    queryKey: ['public', 'articleDetail', detail],
    apiUrl: `/exmaples/detail`,
  },
  ...
};
export default exampleQuery;
```
**models/example/interface.ts**
```
export interface IExampleDetail {
    // your properties
}
```
- #### Fetch a list (Normally method GET)

Using in a component
```
import { useList } from 'hooks';
import exampleQuery from 'models/example/query';
import type { IExample } from 'models/example/interface';
...
const { list } = useList<IExampleItem>(exampleQuery.exampleList)
```

**models/example/query.ts**
```
const exampleQuery = {
  exampleList: {
    queryKey: ['public', 'exmaples'],
    apiUrl: `/exmaples/list`,
  },
  ...
};
export default exampleQuery;
```
**models/example/interface.ts**
```
export interface IExampleItem {
    // your properties
}
```
- #### Do an action (Normally method POST, PUT, DELETE, PATCH)

Using in a component
```
import { useMutate } from 'hooks';
import exampleQuery from 'models/example/query';
import type { IExample } from 'models/example/interface';
...
const { list } = useList<IExampleItem>(exampleQuery.updateExample)
```

**models/example/query.ts**
```
const exampleQuery = {
  updateExample: {
    apiUrl: `/exmaples/update`,
    method: 'put' // 'delete' or 'patch'
  },
  ...
};
export default exampleQuery;
```
**models/example/interface.ts**
```
export interface IUpdateExample {
    // your properties
    // Normally we will use Infer<typeof schema>
    // Refer login page code
}
```

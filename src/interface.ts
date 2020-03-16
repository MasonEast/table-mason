/*
 * @Description:
 * @Date: 2020-03-16 11:12:47
 * @Author: mason
 */
export type DefaultRecordType = Record<string, any>

export type DataArray = Array<string | number | (string | number)>

type Component<P> =
    | React.ComponentType<P>
    | React.ForwardRefExoticComponent<P>
    | React.FC<P>
    | keyof React.ReactHTML;


export type CustomizeComponent<
    P extends React.HTMLAttributes<HTMLElement> = React.HTMLAttributes<HTMLElement>
    > = Component<P>;

export interface TableComponents {
    table?: CustomizeComponent;
    header?: {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
    body?: {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
}

export type GetComponent = (
    path: string[],
    defaultComponent?: CustomizeComponent,
) => CustomizeComponent;

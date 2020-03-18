/*
 * @Description:
 * @Date: 2020-03-16 11:12:47
 * @Author: mason
 */
export type Key = React.Key;

export type FixedType = 'left' | 'right' | boolean;

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

//columns
export type ColumnsType<RecordType> = (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];

export interface CellType<RecordType> {
    key?: Key;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    column?: ColumnsType<RecordType>[number];
    colSpan?: number;
    rowSpan?: number;

    /** Only used for table header */
    hasSubColumns?: boolean;
    colStart?: number;
    colEnd?: number;
    measure?: boolean;
}
interface ColumnSharedType<RecordType> {
    title?: React.ReactNode;
    key?: Key;
    className?: string;
    fixed?: FixedType;
    onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;
    ellipsis?: boolean;
    align?: AlignType;
}

export type AlignType = 'left' | 'center' | 'right';

export type DataIndex = string | number | (string | number)[];

export interface RenderedCell<RecordType> {
    props?: CellType<RecordType>;
    children?: React.ReactNode;
}
export interface ColumnGroupType<RecordType> extends ColumnSharedType<RecordType> {
    children: ColumnsType<RecordType>;
}
export interface ColumnType<RecordType> extends ColumnSharedType<RecordType> {
    colSpan?: number;
    dataIndex?: DataIndex;
    render?: (
        value: any,
        record: RecordType,
        index: number,
    ) => React.ReactNode | RenderedCell<RecordType>;
    rowSpan?: number;
    width?: number | string;
    onCell?: GetComponentProps<RecordType>;
    /** @deprecated Please use `onCell` instead */
    onCellClick?: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
}

// ================= Customized =================
export type GetComponentProps<DataType> = (
    data: DataType,
    index?: number,
) => React.HTMLAttributes<HTMLElement>;

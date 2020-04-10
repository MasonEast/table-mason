/*
 * @Description:
 * @Date: 2020-04-10 16:12:53
 * @Author: mason
 */
import { useState, AllHTMLAttributes } from 'react';

export function useCheckbox(
    defaultChecked: boolean = false,
    selectRows: number[],
    index: number
): AllHTMLAttributes<HTMLInputElement> {
    const [checked, setChecked] = useState(defaultChecked);

    return {
        type: 'checkbox',
        checked: selectRows.includes(index),
        onChange() {
            setChecked(!checked);
        },
    }

}

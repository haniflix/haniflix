import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import {
    ChevronDown,
} from '../../Assets/svgs/tsSvgs'

import styles from './welcome.module.scss'
import { addClassNames } from "../../store/utils/functions";


interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

interface AppAccordionProps {
    items: AccordionItem[];
}

const AppAccordion: React.FC<AppAccordionProps> = ({ items }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleExpand = (panel: string) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className='mt-[50px] '>
            {items.map((item) => (
                <Accordion
                    key={item.id}
                    expanded={expanded === item.id}
                    onChange={handleExpand(item.id)}
                    className={
                        addClassNames(
                            styles["blur_bg"],
                            'mb-2 !rounded-[10px]'
                        )
                    }
                >
                    <AccordionSummary
                        expandIcon={
                            <div className="scale-[0.7]">
                                <ChevronDown />
                            </div>
                        }
                        aria-controls={`${item.id}-content`}
                        id={`${item.id}-header`}
                    >
                        <p className='text-white text-[20px]'>{item.title}</p>
                    </AccordionSummary>
                    <AccordionDetails
                        className=' relative'
                    >
                        <div
                            className='bg-[#292929] h-[1px]  absolute top-0 right-[20px] left-[20px]'
                        />
                        <div className=''>

                            {item.content.split('\n').map((line, index) => (
                                <p
                                    key={index}
                                    className='text-white text-[20px] mb-[13px]'>
                                    {line}
                                </p>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default AppAccordion;

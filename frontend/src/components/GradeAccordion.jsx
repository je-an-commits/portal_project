import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FileText, GraduationCap, LockIcon } from "lucide-react";

export function AccordionBasic(props) {

    const groupedGrades = props.grades.reduce((acc, grade) => {
       const key = `${grade.acad_year}|${grade.semester}`;

            if (!acc[key]) {
                acc[key] = {
                key,
                acad_year: grade.acad_year,
                semester: grade.semester,
                subjects: [],
                };
            }

            acc[key].subjects.push(grade);

            return acc;
    }, {});

    const semesters = Object.values(groupedGrades)
    .map((sem) => {
        const gradedSubjects = sem.subjects.filter(
        (subject) => subject.final_grade !== null
        );

        const totalWeighted = gradedSubjects.reduce(
        (sum, subject) =>
            sum + Number(subject.final_grade) * subject.units,
        0
        );

        const totalUnits = gradedSubjects.reduce(
        (sum, subject) => sum + subject.units,
        0
        );

        return {
        ...sem,
        gwa:
            totalUnits > 0
            ? (totalWeighted / totalUnits).toFixed(2)
            : null,
        };
    })
    .sort((a, b) => {
  
        if (a.acad_year !== b.acad_year) {
            return b.acad_year.localeCompare(a.acad_year);
        }


        const order = {
            "FIRST SEMESTER": 1,
            "SECOND SEMESTER": 2,
            "MIDYEAR": 3,
        };

        return order[b.semester] - order[a.semester];
    });

    if (semesters.length === 0) {
        return null;
    }


    console.log(semesters)
    
    return (
        <Accordion type="single" collapsible  defaultValue={semesters[0].key}>
            {semesters.map((sem) => (
                <AccordionItem
                    key={sem.key}
                    value={sem.key}
                    className="mb-2"
                    >
                    <AccordionTrigger className="flex-wrap lg:flex-nowrap gap-1 lg:gap-4 lg:**:data-[slot=accordion-trigger-icon]:ml-0 bg-gray-200 border-1 border-gray-100 hover:bg-green-900 hover:text-white data-[state=open]:bg-green-800 data-[state=open]:text-white cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div>
                                <GraduationCap size={40} className="shrink-0" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[8px] lg:text-[10px] ">
                                    ACADEMIC YEAR {sem.acad_year}
                                </span>
                                <span className="font-bold text-[16px] lg:text-lg">
                                    {sem.semester}
                                </span>
                            </div>
                        </div>

                        {sem.gwa ?
                            <div className="flex flex-wrap items-center gap-2 ml-auto">
                                <button className="text-[10px] lg:text-[12px] px-5 py-2 lg:px-3 lg:py-2 bg-green-100 rounded-md text-green-900 font-black whitespace-nowrap">
                                    GWA: {sem.gwa}
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-1 text-[10px] lg:text-[12px] px-5 py-2 lg:px-3 lg:py-2 bg-red-700 rounded-md text-gray-100 font-black hover:bg-red-800 cursor-pointer whitespace-nowrap">
                                    <FileText size={14} /> Print COG
                                </button>
                            </div>
                            :
                            <div className="flex flex-wrap items-center gap-2 ml-auto">
                                <button className="flex items-center gap-1 text-[10px] lg:text-[12px] px-2 py-1.5 lg:px-3 lg:py-2 rounded-md bg-red-100 text-red-900 font-bold whitespace-nowrap">
                                    <LockIcon size={14} /> GWA Locked
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); }} className="flex items-center gap-1 text-[10px] lg:text-[12px] px-2 py-1.5 lg:px-3 lg:py-2 rounded-md bg-red-100 text-red-900 font-bold whitespace-nowrap">
                                    <LockIcon size={14} /> Locked (Pending SET)
                                </button>
                            </div>
                        }

                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="border border-slate-200 rounded-b-md overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="text-slate-900 text-left text-xs sm:text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                                    <tr className="bg-slate-50">
                                        <th className="px-4 py-3.5">COURSE CODE</th>
                                        <th className="px-4 py-3.5">DESCRIPTION</th>
                                        <th className="px-4 py-3.5 text-center">UNITS</th>
                                        <th className="px-4 py-3.5 text-center">FINAL GRADE</th>
                                        <th className="px-4 py-3.5">STATUS</th>
                                    </tr>
                                </thead>

                                <tbody className="text-[10px] sm:text-xs divide-y divide-slate-200">
                                    {sem.subjects.map((data) => (
                                        <tr key={data.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                                                {data.sub_code}
                                            </td>

                                            <td className="px-4 py-4 text-slate-500 min-w-[250px] uppercase">
                                                {data.sub_desc}
                                            </td>

                                            <td className="px-4 py-4 text-center text-slate-500 whitespace-nowrap uppercase">
                                                {data.units}
                                            </td>

                                            <td className="px-4 py-4 text-center text-slate-500 whitespace-nowrap uppercase">
                                                {data.final_grade ?? "-"}
                                            </td>

                                            <td className={`px-4 py-4 whitespace-nowrap uppercase ${ data.status === "PASSED" ? "text-green-900 font-bold" : "text-slate-500"}`}>
                                                {data.status ?? "ONGOING"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

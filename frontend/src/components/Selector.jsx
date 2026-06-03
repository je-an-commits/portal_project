import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo(props) {
    const item = props.semester[0];
  return (
    <Select>
      <SelectTrigger className=" max-w-60 text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Semester</SelectLabel>
            <SelectItem key={item.id} value={item.semester + "|" + item.acad_year}>
                {item.semester + " | " + item.acad_year}
            </SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

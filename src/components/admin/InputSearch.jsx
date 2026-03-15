import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputSearch({onChange}) {
  return (
      <Field className='w-1/2 mb-4'> 
      <FieldLabel htmlFor="input-button-group">Buscar</FieldLabel>
      <ButtonGroup>
        <Input 
          id="input-button-group" 
          placeholder="Escriba para buscar..." 
          onChange={onChange}
        />
      </ButtonGroup>
    </Field>
    
  )
}

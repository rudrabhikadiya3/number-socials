'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DialogDescription } from '@radix-ui/react-dialog'

interface LoginModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  description: string
}

export default function LoginAlertModal({ isOpen, onOpenChange, description }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are not logged in yet</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className='flex items-center justify-center'>
          <Button
            onClick={() => {
              window.location.href = '/login'
              ;() => onOpenChange(false)
            }}
            className='w-1/2'
            variant='outline'
            size='sm'
          >
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

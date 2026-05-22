import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { extractText } from 'unpdf'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const buffer = await file.arrayBuffer()

  try {
    const { text } = await extractText(new Uint8Array(buffer), { mergePages: true })
    return NextResponse.json({ text })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Gagal membaca PDF' }, { status: 500 })
  }
}
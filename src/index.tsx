import React, { useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { useFabricJSEditor, FabricJSEditor, FabricJSEditorHook } from './editor'

export interface Props {
  className?: string
  onReady?: (canvas: any) => void
  isMobile?: boolean
}

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady, isMobile }: Props) => {
  const canvasEl = useRef(null)
  const canvasElParent = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isMobile) {
      const staticCanvas = new fabric.StaticCanvas(canvasEl.current)
      const setCurrentDimensions = () => {
        staticCanvas.setHeight(canvasElParent.current?.clientHeight || 0)
        staticCanvas.setWidth(canvasElParent.current?.clientWidth || 0)
        staticCanvas.renderAll()
      }
      const resizeCanvas = () => {
        setCurrentDimensions()
      }
      setCurrentDimensions()

      window.addEventListener('resize', resizeCanvas, false)

      if (onReady) {
        onReady(staticCanvas)
      }

      return () => {
        staticCanvas.dispose()
        window.removeEventListener('resize', resizeCanvas)
      }
    } else {
      const canvas = new fabric.Canvas(canvasEl.current)
      const setCurrentDimensions = () => {
        canvas.setHeight(canvasElParent.current?.clientHeight || 0)
        canvas.setWidth(canvasElParent.current?.clientWidth || 0)
        canvas.renderAll()
      }
      const resizeCanvas = () => {
        setCurrentDimensions()
      }
      setCurrentDimensions()

      window.addEventListener('resize', resizeCanvas, false)

      if (onReady) {
        onReady(canvas)
      }

      return () => {
        canvas.dispose()
        window.removeEventListener('resize', resizeCanvas)
      }
    }
  }, [])
  return (
    <div ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </div>
  )
}

export { FabricJSEditor, FabricJSCanvas, FabricJSEditorHook, useFabricJSEditor }
